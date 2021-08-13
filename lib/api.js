const API_URL = process.env.WP_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getRecentPosts() {
  const data = await fetchAPI(`query getRecentPosts {
  posts(where: {orderby: {field: DATE, order: DESC}}, first: 6) {
    edges {
      node {
        id
        title
        slug
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
}
`);

  return data?.posts;
}
