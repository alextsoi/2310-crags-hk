import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import zones from '@/app/data/zones.json'
import Link from 'next/link'
import _ from 'lodash'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'

export const metadata = {
    title: 'Sunset Forest Boulders Zones | CRAGS.HK',
    description: 'Navigate and explore Sunset Forest with ease using our comprehensive zone guide on CRAGS.HK. Learn about each zone\'s unique blocs, problems, and features.Stay updated with new zones as they are developed.',
    openGraph: {
        title: 'Sunset Forest Boulders Zones | CRAGS.HK',
        description: 'Navigate and explore Sunset Forest with ease using our comprehensive zone guide on CRAGS.HK. Learn about each zone\'s unique blocs, problems, and features.Stay updated with new zones as they are developed.',
        url: `${websiteHost}sunset-forest/zones`,
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

export default async function Zone() {
    // read all the files under src/zones
    const zoneFiles = await fs.readdir('src/zones');
    let allZones = [];
    for (const file of zoneFiles) {
        const fileContent = await fs.readFile(`src/zones/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allZones.push(data);
        }
    }
    allZones = _.sortBy(allZones, 'order');
    console.log(allZones);

    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Zone Listings</h1>
                {allZones.map((zone) => {
                    // TODO: find number of boulders in the zone
                    // let matchedZone = zones.data.find(z => z.id === zone);
                    // routes.data.filter(route => route.zone === zone).length
                    return <section key={zone} className={styles.zone}>
                        <h3><Link
                            title={`Sunset Forest Bouldering ${zone.name} | Sunset Forest Bouldering Grades | CRAGS.HK`}
                            href={`/sunset-forest/zone/${zone.id}`}>{zone.name}</Link><span className={styles.problemCount}>x 0 problems</span></h3>
                        {zone.access && <div><a href={zone.access.link} title={zone.access.title} target={zone.access.target ? zone.access.target : '_blank'}>{zone.access.text}</a></div>}
                    </section>;
                })}
                <article className={styles.articleParagraphs}>
                    <p>Welcome to your definitive guide to the zones in Sunset Forest, exclusively on CRAGS.HK. We have meticulously segmented the Sunset Forest bouldering site into distinctive zones, making it easier for you to navigate and explore the area.</p>
                    <p>At CRAGS.HK, we understand that a well-organized climbing site can significantly enhance your bouldering experience. That's why we've divided Sunset Forest into manageable zones, each featuring a unique collection of blocs and problems.</p>
                    <p>Our guide provides a detailed overview of each zone, including its location, the number of blocs, the range of problems, and any specific features or challenges it offers. Whether you're a seasoned climber seeking new challenges or a beginner looking for a suitable starting point, our zone guide helps you plan your visit efficiently.</p>
                    <p>In addition to the practical information, we've included some fascinating insights about each zone. Learn about the unique flora and fauna, the history of climbing in that area, and any environmental considerations to keep in mind.</p>
                    <p>We believe in the continuous exploration and development of Sunset Forest, and as such, our guide will be regularly updated with new zones as they are developed. Stay tuned for the latest additions to our growing list.</p>
                    <p>Join us at CRAGS.HK, and let's navigate the zones of Sunset Forest together!</p>
                </article>
            </div>
        </main>
    )
}
