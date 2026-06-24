import { defineField, defineType } from 'sanity'
import { canModify } from '../src/sanity/lib/ownership'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  // Auto-stamp the creator's Sanity user id on new posts.
  // Guard against empty-string ids (service accounts) — store undefined instead
  // so the post is treated as unowned rather than locked to an unmatchable owner.
  initialValue: (_params, { currentUser }) => ({
    ownerId: currentUser?.id || undefined,
  }),
  // Lock the whole form for anyone who isn't the owner (or an admin).
  // Unowned legacy posts stay editable. See ownership.ts for the caveat.
  // currentUser is null during auth load — return false (unlocked) so the owner
  // isn't stuck with a read-only form before their session resolves.
  readOnly: ({ document, currentUser }) => {
    if (!currentUser) return false
    return !canModify(document?.ownerId as string | undefined, currentUser)
  },
  fields: [
    defineField({
      name: 'ownerId',
      title: 'Owner',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Update', value: 'Update' },
          { title: 'Idea', value: 'Idea' },
          { title: 'Opinion', value: 'Opinion' },
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
