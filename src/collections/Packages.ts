import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'package-name',
      type: 'text',
      required: true,
    },
  ],
}