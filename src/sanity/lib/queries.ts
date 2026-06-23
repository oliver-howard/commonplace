import { defineQuery } from 'groq'

export const WEEKLY_POSTS_QUERY = defineQuery(`
  *[_type == "post" && publishedAt > $since] | order(publishedAt desc) [0..4] {
    "id": slug.current,
    title,
    deck,
    author,
    "date": coalesce(publishedAt, _createdAt),
    body
  }
`)

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    "id": slug.current,
    title,
    category,
    deck,
    author,
    initials,
    "date": coalesce(publishedAt, _createdAt),
    "read": readTime,
    "coverImage": mainImage.asset->url
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    "id": slug.current,
    title,
    category,
    deck,
    author,
    initials,
    "date": coalesce(publishedAt, _createdAt),
    "read": readTime,
    "coverImage": mainImage.asset->url,
    body
  }
`)
