import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'project-title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({}),
    },
  ],
}