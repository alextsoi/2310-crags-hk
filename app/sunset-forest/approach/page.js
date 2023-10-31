import styles from '@/app/page.module.scss'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export const metadata = {
    title: 'Sunset Forest Bouldering Site Approach | CRAGS.HK',
    description: 'Find your way to Sunset Forest bouldering site with ease using our detailed approach guide on CRAGS.HK. Just a 10-minute walk from the minibus station, plus a nearby convenience store for all your needs.',
    openGraph: {
        title: 'Sunset Forest Bouldering Site Approach | CRAGS.HK',
        description: 'Find your way to Sunset Forest bouldering site with ease using our detailed approach guide on CRAGS.HK. Just a 10-minute walk from the minibus station, plus a nearby convenience store for all your needs.',
        url: `${websiteHost}sunset-forest/approach`,
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

export default function Approach() {
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Approach</h1>
                <h2>Easy Access</h2>
                <p>One of the best things about Sunset Forest bouldering site is its accessibility. Just a 10-minute walk from the nearest minibus station, you can quickly transition from your journey to starting your climbing adventure. To make your approach even more straightforward, we've included detailed images illustrating the path from the minibus station to the bouldering site.</p>
                <p>You can find the No.16 minibus station in <a href="https://maps.app.goo.gl/PpSjgpEocDH71iTK8" target="_blank" title="Sunset Forest Bouldering Site nearby minibus station | CRAGS.HK">here</a>.</p>
                <h3>Convenience Store</h3>
                <p>To further enhance your experience, there's a convenience store close to the bouldering site. Whether you forgot to bring a snack, need a refreshing drink, or require some last-minute supplies, the convenience store has you covered. It's just another way we're making bouldering at Sunset Forest as enjoyable and hassle-free as possible.</p>
                <div className={styles.approachWrapper}>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-1.jpg" alt="Sunset Forest Bouldering Site Approach Step 1 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-2.jpg" alt="Sunset Forest Bouldering Site Approach Step 2 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-3.jpg" alt="Sunset Forest Bouldering Site Approach Step 3 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-4.jpg" alt="Sunset Forest Bouldering Site Approach Step 4 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-5.jpg" alt="Sunset Forest Bouldering Site Approach Step 5 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-6.jpg" alt="Sunset Forest Bouldering Site Approach Step 6 | CRAGS.HK" />
                    </div>
                    <div className={styles.approach}>
                        <img loading="lazy" width={396} height={704} src="/images/common/approach-7.jpg" alt="Sunset Forest Bouldering Site Approach Step 7 | CRAGS.HK" />
                    </div>
                </div>
                <h4>The Journey</h4>
                <p>Remember, the journey to the bouldering site is part of the adventure. As you walk from the minibus station, enjoy the surrounding scenery and the anticipation of the climb ahead.</p>
                <p>At CRAGS.HK, we are committed to making your bouldering experience in Sunset Forest smooth and memorable. We hope this guide helps you easily approach our site and maximize your time spent on the fantastic boulders.</p>
                <p>Join us, and let's enjoy the beauty and challenge of Sunset Forest together!</p>
            </div>
        </main>
    )
}
