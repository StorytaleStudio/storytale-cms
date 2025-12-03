import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'offer-name',
      type: 'text',
      required: true,
    },
    {
      name: 'offer-info',
      type: 'textarea',
      required: true,
    },
  ],
}