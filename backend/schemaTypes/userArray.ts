import {defineField, defineType} from 'sanity'

export const userArray = defineType({
  name: 'brukere',
  title: 'Brukere',
  type: 'document',
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'bruker'}
          ]
        }
      ]
    })
  ]
})