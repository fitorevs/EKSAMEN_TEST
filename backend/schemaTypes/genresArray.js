import {defineField, defineType} from 'sanity'

export const genresArray = defineType({
  name: 'sjangere',
  title: 'Sjangere',
  type: 'document',
  fields: [
    defineField({
      name: 'list',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'sjanger'}
          ]
        }
      ]
    })
  ]
})