"use server";

import { getCurrentUser } from "@/lib/permissions";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export type AssignTaskResult = {
  success: boolean;
  message: string;
  error?: string;
};

/**
 * Assign a task to an assistant
 */
export async function assignTask(
  submissionId: string,
  assistantId: string,
  userGroupId: string
): Promise<AssignTaskResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized",
        error: "You must be logged in to assign tasks",
      };
    }

    // Only managers and editors can assign tasks
    const hasPermission = user.roles.some(
      (role) => role.role_path === "admin" || role.role_path === "manager" || role.role_path === "editor"
    );

    if (!hasPermission) {
      return {
        success: false,
        message: "Forbidden",
        error: "Only journal managers and editors can assign tasks",
      };
    }

    const supabase = getSupabaseAdminClient();

    // Get the submission to verify it exists
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select("id, journal_id")
      .eq("id", submissionId)
      .single();

    if (submissionError || !submission) {
      return {
        success: false,
        message: "Submission not found",
        error: "The specified submission does not exist",
      };
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
      return {
        success: false,
        message: "Failed to assign task",
        error: error.message,
      };
    }

    // Revalidate assistant pages
    revalidatePath("/assistant");
    revalidatePath("/assistant/tasks");
    revalidatePath("/assistant/submissions");

    return {
      success: true,
      message: "Task assigned successfully",
    };
  } catch (error) {
    console.error("Error in assignTask:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

