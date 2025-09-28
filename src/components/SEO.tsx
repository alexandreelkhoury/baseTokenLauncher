import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
  structuredData?: object
}

export default function SEO({ 
  title = "Base Token Creator - Create ERC20 Tokens on Base Blockchain | No Code Required",
  description = "Create ERC20 tokens on Base blockchain in 5 seconds. No coding required! Deploy tokens with less than $1 gas fees, 90% lower than Ethereum. Add liquidity on Uniswap and launch your crypto project today.",
  keywords = "base token creator, erc20 token generator, base blockchain, create token base, no code token creator, base token launcher, coinbase base, ethereum layer 2, uniswap v3, basescan",
  canonical,
  ogImage = "/og-image.png",
  noIndex = false,
  structuredData
}: SEOProps) {
  const siteUrl = "https://base-token-creator.com"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}