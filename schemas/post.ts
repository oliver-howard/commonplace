import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Updates', value: 'Updates' },
          { title: 'Ideas', value: 'Ideas' },
          { title: 'Opinions', value: 'Opinions' },
          { title: 'Notes', value: 'Notes' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'deck', title: 'Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'initials', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'readTime', title: 'Read time (e.g. "7 min")', type: 'string' }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'markdown' }),
  ],
})
