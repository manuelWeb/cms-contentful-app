const PAGE = `
name
title
collectionItems
`
/* pages {
  name
  title
} */
const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
  width
  height
  description
}
date
author {
  name
  picture {
    url
    width
    height
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys { id }
        url
        description
      }
    }
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => {
    return response.json()
  })
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

/**
 * View server console to see the output of new posts
 * TODO trigger only on preproduction and recette
 */
getAllPostsWithSlug()
  .then(r => {
    const slugs = r.map(slug => slug.slug);
    console.log(slugs);
  })

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

const myItems = `
contentTypeRichTextCollection(preview:true){
  total
  items{
    richTextField{json}
  }
}
`
export async function getAllPages(preview) {
  const entries = await fetchGraphQL(
    `query {
      pagesCollection(preview: ${preview ? 'true' : 'false'}) {
        total
        items{
          name
          title
          collectionItemsCollection(preview:true){
            total
            items{
              sys{id}
            }
          }
        }
      }
    }`,
    preview
  )
  /* ContentTypeRichText(sys{id},preview:true){
    total
  } */
  return entries
}

/* getAllPages(true)
  .then(r => {
    console.log(JSON.stringify(r, null, 2));
  }) */

export function getAllPagesStatiques(preview) {
  const entries = fetchGraphQL(
    `query {
      pagesStatiquesCollection(preview: ${preview ? 'true' : 'false'}, locale:"fr") {
          total
          items{
            name
            title
            slug
          }
        }
      }`,
    preview
  );
  return entries
}

/* getAllPagesStatiques(true)
  .then(r => {
    console.log(JSON.stringify(r, null, 2));
  }) */