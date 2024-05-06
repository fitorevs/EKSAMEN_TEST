import {defineField, defineType} from 'sanity'

export const movieArray = defineType({
  name: 'filmer',
  title: 'Filmer',
  type: 'document',
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'film'}
          ]
        }
      ]
    })
  ]
})