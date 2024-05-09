import {defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'bruker',
  title: 'Bruker',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'password',
      type: 'string',
    }),
    defineField({
      name: 'identificator',
      type: 'string',
    }),
    defineField({
      name: 'savedMovies',
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
      name: 'savedGenres',
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