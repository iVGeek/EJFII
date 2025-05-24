import React from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
};

const SEO: React.FC<SEOProps> = ({
  title = 'EJ Foundation - Mental Health Awareness',
  description = 'Providing mental health resources, support, and education to help individuals thrive.',
  keywords = ['mental health', 'wellness', 'support', 'therapy', 'depression', 'anxiety', 'EJ Foundation'],
  image = '/images/ej-foundation-social.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
