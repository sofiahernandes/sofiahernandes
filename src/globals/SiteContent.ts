import type { GlobalConfig } from 'payload'

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Site title',
      type: 'text',
      required: true,
      defaultValue: 'Sofia Botechia',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Software Engineering + AI Automations',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: ['github', 'linkedin', 'instagram', 'mail'],
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'introLeading',
          type: 'text',
          required: true,
        },
        {
          name: 'introEmphasized',
          type: 'text',
          required: true,
        },
        {
          name: 'introTrailing',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'closing',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'techStackTitle',
      label: 'Tech stack title',
      type: 'text',
      required: true,
      defaultValue: 'Specialized Skillset',
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        {
          name: 'highlight',
          type: 'checkbox',
          required: false,
          defaultValue: false,
        },
        {
          name: 'skills',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'link', type: 'text', required: false },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'fields',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'email', type: 'text', required: true },
            { name: 'message', type: 'text', required: true },
          ],
        },
        {
          name: 'submitIdle',
          type: 'text',
          required: true,
        },
        {
          name: 'submitPending',
          type: 'text',
          required: true,
        },
        {
          name: 'errorResponse',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'href', type: 'text', required: true },
        { name: 'text', type: 'text', required: true },
      ],
    },
  ],
}
