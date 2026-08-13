import { getSiteContent } from '@/lib/payload-content'
import ContactFormClient from '@/components/contact-form-client'

export default async function ContactForm() {
  const siteContent = await getSiteContent()
  return <ContactFormClient content={siteContent.contact} />
}
