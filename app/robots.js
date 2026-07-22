export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/login/',
          '/signup/',
        ],
      },
    ],
    sitemap: 'https://allurefashion.vercel.app/sitemap.xml',
  }
}