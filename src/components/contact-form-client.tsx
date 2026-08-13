"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/app/actions";
import { useState, type FormEvent } from "react";

type ContactContent = {
  title: string;
  fields: { name: string; email: string; message: string };
  submitIdle: string;
  submitPending: string;
  errorResponse: string;
};

export default function ContactFormClient({
  content,
}: {
  content: ContactContent;
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);
    try {
      const response = await submitContactForm(formData);
      setMessage(response.message);
    } catch {
      setMessage(content.errorResponse);
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      id="contact"
      className="grid grid-cols-2 lg:grid-cols-12 border-t px-6 gap-6 py-24"
    >
      <div className="col-span-full lg:col-span-10 lg:col-start-2">
        <h2 className="text-2xl lg:text-4xl font-bold tracking-tighter mb-6 text-center lg:text-left">
          {content.title}
        </h2>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {content.fields.name}
              </label>
              <Input
                id="name"
                name="name"
                className="bg-white/50 dark:bg-white/10 dark:border-neutral-600"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {content.fields.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-white/50 dark:bg-white/10 dark:border-neutral-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {content.fields.message}
              </label>
              <Textarea
                id="message"
                name="message"
                className="bg-white/50 dark:bg-white/10 dark:border-neutral-600"
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-lg" disabled={pending}>
              {pending ? content.submitPending : content.submitIdle}
            </Button>
            {message && (
              <p className="text-sm text-center mt-4 text-muted-foreground">
                {message}
              </p>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
