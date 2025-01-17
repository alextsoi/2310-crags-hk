import styles from '@/app/page.module.scss'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import fs from 'fs/promises';
import matter from 'gray-matter';
import _ from 'lodash';

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

export default async function Boulders() {
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allBoulders.push(data);
        }
    }
    allBoulders = _.sortBy(allBoulders, 'order');
    console.log(allBoulders);
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Boulder Listings</h1>
                <p>Total <strong>{allBoulders.length}</strong> boulders developed.</p>
                {allBoulders.map(boulder => {
                    return <section className={`${styles.boulder} ${styles.accessContainer}`}>
                        <h3><Link title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} href={`/sunset-forest/boulder/${boulder.slug}`}>{boulder.id} {boulder.name}</Link></h3>
                        {boulder.access && <div><a href={boulder.access.link} title={boulder.access.title} target={boulder.access.target ? boulder.access.target : '_blank'}>{boulder.access.text}</a></div>}
                    </section>;
                })}
                <br />
                <article className={styles.articleParagraphs}>
                    <p>Welcome to the most thorough list of developed boulders in Sunset Forest, exclusively on CRAGS.HK. Here, you can explore all the boulders we've developed, each promising a unique bouldering experience.</p>
                    <p>Our team at CRAGS.HK is committed to providing a complete guide for your bouldering adventures. We have meticulously documented each developed boulder, detailing its location within Sunset Forest, the number and range of problems it offers, and any specific features or challenges it presents.</p>
                    <p>Whether you're a seasoned climber looking for your next challenge or a beginner seeking an appropriate starting point, our list of developed boulders offers something for everyone. Navigate through our comprehensive list to find boulders that suit your skill level and preferences.</p>
                    <p>We believe in the continuous development and exploration of Sunset Forest, and as such, this page will be regularly updated as more boulders are developed. Stay tuned for the latest additions to our growing list.</p>
                    <p>CRAGS.HK is dedicated to fostering a vibrant and inclusive climbing community. We encourage climbers to share their experiences, offer tips, and contribute to the collective knowledge of our community.</p>
                    <p>Together, we can explore the joy of bouldering in Sunset Forest, one boulder at a time.</p>
                </article>
            </div>
        </main>
    )
}
