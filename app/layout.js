import { Inter } from 'next/font/google'
import './globals.scss'
import Script from 'next/script'
import Link from 'next/link'
import { gtmCode, siteName, websiteHost } from './_helpers/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: siteName,
  description: 'Explore Sunset Forest, one of the premier bouldering and climbing sites in Hong Kong, with ease. Our comprehensive online guidebook provides detailed guides and information based on boulders, grades, and ratings, segmented by specific zones. With minimal data usage and fast browsing speed, you can get the latest updates and plan your next adventure effortlessly, even in areas with poor signal or when low on data. Discover the joy of bouldering and climbing with us - your ultimate guide to Sunset Forest, designed for easy access anytime, anywhere.',
  openGraph: {
    title: siteName,
    description: 'Explore Sunset Forest, one of the premier bouldering and climbing sites in Hong Kong, with ease. Our comprehensive online guidebook provides detailed guides and information based on boulders, grades, and ratings, segmented by specific zones. With minimal data usage and fast browsing speed, you can get the latest updates and plan your next adventure effortlessly, even in areas with poor signal or when low on data. Discover the joy of bouldering and climbing with us - your ultimate guide to Sunset Forest, designed for easy access anytime, anywhere.',
    url: websiteHost,
    siteName: siteName,
    images: [
      {
        url: `${websiteHost}og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmCode}');
        `}
      </Script>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <body className={inter.className}>
        <header className="root-header">
          <div className="container flex-container">
            <nav className="primary-menu">
              <ul>
                <li><Link title="Sunset Forest Homepage | CRAGS.HK" href={`/`}>Home</Link></li>
                <li><Link title="Sunset Forest Approach | CRAGS.HK" href={`/sunset-forest/approach`}>Approach</Link></li>
                <li><Link title="Sunset Forest Boulder Problems | CRAGS.HK" href={`/sunset-forest`}>All Problems</Link></li>
                <li><Link title="Sunset Forest Boulders | CRAGS.HK" href={`/sunset-forest/boulders`}>Boulders</Link></li>
                <li><Link title="Sunset Forest Grades | CRAGS.HK" href={`/sunset-forest/grades`}>Grades</Link></li>
                <li><Link title="Sunset Forest Ratings | CRAGS.HK" href={`/sunset-forest/ratings`}>Ratings</Link></li>
                <li><Link title="Sunset Forest Zones | CRAGS.HK" href={`/sunset-forest/zones`}>Zones</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <Script src="https://buttons.github.io/buttons.js" />
        <footer>
          <div className="flex-container container">
            <div>
              feel free to create issue / pull request on my repo - By alex
            </div>
            <div className="social-networks">
              <a className="github-button" href="https://github.com/alextsoi" aria-label="Follow @alextsoi on GitHub">Follow @alextsoi</a>
              <a className="github-button" href="https://github.com/alextsoi/2310-crags-hk/issues" data-icon="octicon-issue-opened" aria-label="Issue alextsoi/2310-crags-hk on GitHub">Issue</a>
            </div>
          </div>
          <div className="flex-container container footer-thanks">
            Thanks Hoi / Sze / Matt / Alex / Gary / Jamie / Wai / Matt / Also friends & gym who helped grading, developing the site...
          </div>
          <div className="flex-container container footer-thanks">&copy; {(new Date()).getFullYear()} crags.hk All Rights Reserved.</div>
        </footer>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmCode}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  )
}
