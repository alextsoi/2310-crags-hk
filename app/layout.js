import { Inter } from 'next/font/google'
import './globals.scss'
import Script from 'next/script'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
                <li><Link href={`/blocs`}>Blocs</Link></li>
                <li><Link href={`/grade`}>Grade</Link></li>
                <li><Link href={`/rating`}>Rating</Link></li>
                <li><Link href={`/zone`}>Zone</Link></li>
              </ul>
            </nav>
            <div className="social-networks">
              <a className="github-button" href="https://github.com/alextsoi" aria-label="Follow @alextsoi on GitHub">Follow @alextsoi</a>
              <a className="github-button" href="https://github.com/buttons/github-buttons/issues" data-icon="octicon-issue-opened" aria-label="Issue buttons/github-buttons on GitHub">Issue</a>
            </div>
          </div>
        </header>
        {children}
        <Script src="https://buttons.github.io/buttons.js" />
        <footer>
          <div className="container">
            feel free to create issue / pull request on my repo
            <br/>- By alex
          </div>
        </footer>
      </body>
    </html>
  )
}
