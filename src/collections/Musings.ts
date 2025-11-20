import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Musings: CollectionConfig = {
  slug: 'musings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'musing-title',
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