import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  schema?: Record<string, unknown>;
  noIndex?: boolean;
}

const BRAND = 'Maison Lumière';
const DEFAULT_DESC = 'Curated luxury women\'s fashion — sarees, gowns, ethnic & western wear crafted for the modern woman.';
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80';

export function Seo({ title, description = DEFAULT_DESC, image = DEFAULT_IMG, schema, noIndex }: SeoProps) {
  const fullTitle = title ? `${title} — ${BRAND}` : `${BRAND} — Luxury Women's Fashion`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
