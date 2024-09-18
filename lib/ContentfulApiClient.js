const config = require('dotenv').config({ path: `${process.cwd()}/.env.local` })

if (config.error) {
  throw config.error
}
console.log('config', config);

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_CDA_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_CDA_TOKEN) {
  throw new Error("Contentful credentials are missing!");
}

// export class ContentfulClient {
class ContentfulClient {
  BASE_URL = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master`;
  contentType = "";

  constructor(type) {
    this.contentType = type;
  }

  async makeRequest(url) {
    try {
      const res = await fetch(
        `${this.BASE_URL}/${url}&access_token=${CONTENTFUL_CDA_TOKEN}`
      );
      const json = await res.json();

      return json;
    } catch (e) {
      console.log(`Fetch Err: ${e}`);
    }
  }

  async getItems(searchText) {
    let url = `/entries?content_type=${this.contentType}`;

    if (searchText) {
      url += `&fields.name[match]=${searchText}`;
    }
    console.log('url', url);

    const { items } = await this.makeRequest(url);

    return items;
  }

  async getItemsByTitle(searchText) {
    let url = `/entries?content_type=${this.contentType}`;

    if (searchText) {
      url += `&fields.title[match]=${searchText}`;
    }
    console.log('url', url);

    const { items } = await this.makeRequest(url);

    return items;
  }

  async getAsset(id) {
    const url = `assets/${id}?content_type=${this.contentType}`;

    const { fields } = await this.makeRequest(url);

    return fields;
  }
}

const Wood = new ContentfulClient("woodcraftAuction");
const Post = new ContentfulClient("post");

const CtfRes = async (contentType_id, searchText) => {
  try {
    const data = await contentType_id.getItems(searchText);

    return data;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}
const CtfByTitle = async (contentType_id, searchText) => {
  try {
    const data = await contentType_id.getItemsByTitle(searchText);

    return data;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}


/* CtfRes(Wood, 'Plat en bois sculté')
  .then(console.log)

CtfByTitle(Post, '2001')
  .then(console.log) */

console.log('ContentfulClient:', process.env.CONTENTFUL_SPACE_ID);