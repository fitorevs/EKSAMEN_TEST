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
          type: 'object',
          fields: [
            {
              name: 'film',
              type: 'reference',
              to: [{type: 'film'}]
            },
            {
              name: 'inWishlist',
              type: 'boolean',
              title: 'I Ønskeliste'
            },
            {
              name: 'isFavorite',
              type: 'boolean',
              title: 'Er Favoritt'
            }
          ]
        }
      ]
    })
  ]
})