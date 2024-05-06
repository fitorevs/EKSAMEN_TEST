import {defineField, defineType} from 'sanity'

export const movieType = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ]
})