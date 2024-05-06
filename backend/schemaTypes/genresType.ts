import {defineField, defineType} from 'sanity'

export const genresType = defineType({
  name: 'sjanger',
  title: 'Sjanger',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ]
})