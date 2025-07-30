"use server"

import { Resend } from "resend"

const resend = new Resend("re_LR125HCV_Cjbv4WD6vpkuDyakiQiWcbG4") // process.env.RESEND_API_KEY

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email").trim().toLowerCase() as string
  const message = formData.get("message") as string

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sofiahernandes.dev@gmail.com",
      subject: `Portfolio Message: ${name}`,
      html: `
        <p>From: ${email}</p>
        <p>${message}</p>
      `,
    })

    return {
      message: "Thanks for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Resend error:", error)
    return {
      message: "Something went wrong. Please try again later.",
    }
  }
}
