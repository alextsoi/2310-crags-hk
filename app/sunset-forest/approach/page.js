import styles from '@/app/page.module.scss'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export const metadata = {
    title: 'Sunset Forest Boulders | CRAGS.HK',
    description: 'Explore all developed boulders in Sunset Forest on CRAGS.HK. Navigate through our comprehensive list to find boulders that suit your skill level and preferences. Regularly updated for your bouldering adventures.',
    openGraph: {
        title: 'Sunset Forest Boulders | CRAGS.HK',
        description: 'Explore all developed boulders in Sunset Forest on CRAGS.HK. Navigate through our comprehensive list to find boulders that suit your skill level and preferences. Regularly updated for your bouldering adventures.',
        url: `${websiteHost}sunset-forest/boulders`,
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

export default function Boulders() {
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Approach</h1>

                <div className={styles.approach}>
                    <img src="/images/common/approach-1.jpg" alt="Sunset Forest Bouldering Site Approach Step 1 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-2.jpg" alt="Sunset Forest Bouldering Site Approach Step 2 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-3.jpg" alt="Sunset Forest Bouldering Site Approach Step 3 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-4.jpg" alt="Sunset Forest Bouldering Site Approach Step 4 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-5.jpg" alt="Sunset Forest Bouldering Site Approach Step 5 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-6.jpg" alt="Sunset Forest Bouldering Site Approach Step 6 | CRAGS.HK" />
                </div>
                <div className={styles.approach}>
                    <img src="/images/common/approach-7.jpg" alt="Sunset Forest Bouldering Site Approach Step 7 | CRAGS.HK" />
                </div>
            </div>
        </main>
    )
}
