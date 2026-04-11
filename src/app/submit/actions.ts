"use server"

import { createClient } from "@supabase/supabase-js"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

// This client uses the SECRET SERVICE ROLE KEY (Server-side only!)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function submitToPile(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to submit.")
  }

  const { error } = await supabaseAdmin.from('submissions').insert({
    user_id: session.user.id,
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    topic: formData.get('topic') as string,
    source: formData.get('source') as string,
    status: 'pending'
  })

  if (error) throw new Error(error.message)

  // This clears the cache so the new submission shows up immediately
  revalidatePath('/profile')
  
  return { success: true }
}