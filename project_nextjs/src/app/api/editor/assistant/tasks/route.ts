"use server";

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/permissions";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/editor/assistant/tasks
 * Get tasks assigned to the current assistant user
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    // Check if user has assistant role
    const hasAssistantRole = user.roles.some(
      (role) => role.role_path === "assistant" || role.role_path === "admin"
    );

    if (!hasAssistantRole) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const supabase = getSupabaseAdminClient();

    // Get journal ID from user roles
    const journalRole = user.roles.find((r) => r.context_id);
    if (!journalRole?.context_id) {
      return NextResponse.json({ ok: false, message: "Journal not found" }, { status: 400 });
    }

    const journalId = journalRole.context_id;

    // Get submissions assigned to this assistant
    // In OJS, assistants are assigned to submissions via stage_assignments
    const { data: assignments, error: assignmentsError } = await supabase
      .from("stage_assignments")
      .select(`
        id,
        submission_id,
        user_group_id,
        date_assigned,
        submissions!inner(
          id,
          title,
          current_stage,
          status,
          journal_id,
          created_at,
          updated_at
        )
      `)
      .eq("submissions.journal_id", journalId)
      .eq("user_id", user.id);

    if (assignmentsError) {
      console.error("Error fetching assignments:", assignmentsError);
      return NextResponse.json(
        { ok: false, message: "Failed to fetch tasks", error: assignmentsError.message },
        { status: 500 }
      );
    }

    // Format tasks
    const tasks = (assignments || []).map((assignment: any) => ({
      id: assignment.id,
      submissionId: assignment.submission_id,
      submissionTitle: assignment.submissions?.title || "Untitled",
      stage: assignment.submissions?.current_stage || 1,
      status: assignment.submissions?.status || "in_progress",
      dateAssigned: assignment.date_assigned,
      createdAt: assignment.submissions?.created_at,
      updatedAt: assignment.submissions?.updated_at,
    }));

    return NextResponse.json({ ok: true, tasks });
  } catch (error) {
    console.error("Error in GET /api/editor/assistant/tasks:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to fetch tasks",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/editor/assistant/tasks
 * Assign a task to an assistant
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    // Only managers and editors can assign tasks
    const hasPermission = user.roles.some(
      (role) => role.role_path === "admin" || role.role_path === "manager" || role.role_path === "editor"
    );

    if (!hasPermission) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { submissionId, assistantId, userGroupId } = body;

    if (!submissionId || !assistantId || !userGroupId) {
      return NextResponse.json(
        { ok: false, message: "submissionId, assistantId, and userGroupId are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();

    // Get the submission to verify it exists and get journal context
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select("id, journal_id")
      .eq("id", submissionId)
      .single();

    if (submissionError || !submission) {
      return NextResponse.json(
        { ok: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    // Create assignment
    const { data, error } = await supabase
      .from("stage_assignments")
      .insert({
        submission_id: submissionId,
        user_id: assistantId,
        user_group_id: userGroupId,
        date_assigned: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating assignment:", error);
      return NextResponse.json(
        { ok: false, message: "Failed to assign task", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, assignment: data });
  } catch (error) {
    console.error("Error in POST /api/editor/assistant/tasks:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to assign task",
      },
      { status: 500 }
    );
  }
}

