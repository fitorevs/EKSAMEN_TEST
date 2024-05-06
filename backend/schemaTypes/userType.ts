import {defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'bruker',
  title: 'Bruker',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'favorittFilmer',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'filmer'}
          ]
        }
      ]
    }),
    defineField({
      name: 'favorittSjangere',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'sjangere'}
          ]
        }
      ]
    })
  ]
})