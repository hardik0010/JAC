import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'Jay Ambe Construction', 
  description = 'Building dreams and creating landmarks with excellence, quality, and innovation. Your trusted partner in construction for over 15 years, specializing in high-rise buildings.',
  keywords = 'construction, building, residential, commercial, high-rise buildings, Ahmedabad, Gujarat',
  image = '/logo.png',
  url = 'https://jayambeconstruction.com'
}: SEOProps) => {
  const siteTitle = title === 'Jay Ambe Construction' ? title : `${title} | Jay Ambe Construction`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;

