import { groq } from 'next-sanity'

// Pages
export const pagesQuery = groq`*[_type == "page"] | order(publishedAt desc)`

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]`

// Events
export const eventsQuery = groq`*[_type == "event" && status == "published"] | order(startDate asc)`

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]`

export const upcomingEventsQuery = groq`*[_type == "event" && status == "published" && startDate > now()] | order(startDate asc)[0...6]`

// Posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc)`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->
}`

export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3]{
  ...,
  author->
}`

// Team
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc)`

// Settings
export const settingsQuery = groq`*[_type == "settings"][0]`
