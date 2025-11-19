'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from "next/navigation";

function ReviewerHomePage() {
  redirect("/reviewer/dashboard");
}

export default withAuth(ReviewerHomePage, 'reviewer')
