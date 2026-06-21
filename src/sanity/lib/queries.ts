import { defineQuery } from 'groq'

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
