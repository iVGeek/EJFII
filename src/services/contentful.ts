import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || '',
  host: process.env.REACT_APP_CONTENTFUL_HOST || 'cdn.contentful.com',
});

export default client;
