import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'package-name',
      label: 'Package Name',
      type: 'text',
      required: true,
    },
    {
      name: 'byline',
      label: 'Byline',
      type: 'text',
      required: true,
    },
    {
      name: 'elevator-pitch',
      label: 'Elevator Pitch',
      type: 'text',
      required: true,
    },
    {
      name: 'package-link',
      label: 'Package Link',
      type: 'text',
      required: true,
    },
    {
      name: 'package-description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'package-outcomes',
      label: 'Package Outcomes',
      type: 'group',
      fields: [
        {
          name: 'outcome-one',
          label: 'Outcome 1',
          type: 'text',
          required: true,
        },
        {
          name: 'outcome-two',
          label: 'Outcome 2',
          type: 'text',
          required: true,
        },
        {
          name: 'outcome-three',
          label: 'Outcome 3',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
