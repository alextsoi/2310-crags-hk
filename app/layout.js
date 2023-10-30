import { Inter } from 'next/font/google'
import './globals.scss'
import Script from 'next/script'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CRAGS.HK - Hong Kong Online Bouldering Guidebook',
  description: 'Explore Sunset Forest, one of the premier bouldering and climbing sites in Hong Kong, with ease. Our comprehensive online guidebook provides detailed guides and information based on blocs, grades, and ratings, segmented by specific zones. With minimal data usage and fast browsing speed, you can get the latest updates and plan your next adventure effortlessly, even in areas with poor signal or when low on data. Discover the joy of bouldering and climbing with us - your ultimate guide to Sunset Forest, designed for easy access anytime, anywhere.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="root-header">
          <div className="container flex-container">
            <nav className="primary-menu">
              <ul>
                <li><Link href={`/`}>Home</Link></li>
                <li><Link href={`/sunset-forest`}>All Problems</Link></li>
                <li><Link href={`/sunset-forest/blocs`}>Blocs</Link></li>
                <li><Link href={`/sunset-forest/grades`}>Grades</Link></li>
                <li><Link href={`/sunset-forest/ratings`}>Ratings</Link></li>
                <li><Link href={`/sunset-forest/zones`}>Zones</Link></li>
              </ul>
            </nav>
            <div className="social-networks">
              <a className="github-button" href="https://github.com/alextsoi" aria-label="Follow @alextsoi on GitHub">Follow @alextsoi</a>
              <a class="github-button" href="https://github.com/alextsoi/2310-crags-hk/issues" data-icon="octicon-issue-opened" aria-label="Issue alextsoi/2310-crags-hk on GitHub">Issue</a>
            </div>
          </div>
        </header>
        {children}
        <Script src="https://buttons.github.io/buttons.js" />
        <footer>
          <div className="container">
            feel free to create issue / pull request on my repo
            <br />- By alex
          </div>
        </footer>
      </body>
    </html>
  )
}
