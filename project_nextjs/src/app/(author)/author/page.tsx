'use client'

import { withAuth } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

function AuthorHomePage() {
  redirect('/author/dashboard')
}

export default withAuth(AuthorHomePage, 'author')