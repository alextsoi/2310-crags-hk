import styles from '@/app/page.module.scss'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
// read md file and convert to json
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'
import html from 'remark-html'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

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

export default async function Approach() {
    const filename = './src/approach.md';
    const file = path.join(process.cwd(), filename);
    const fileContent = await fs.readFile(file, 'utf8');
    const data = matter(fileContent).data;
    let content = data.content;
    let processor = unified().use(remarkParse).use(html);
    let contentResult = await processor.process(content);
    console.log(contentResult);
    contentResult = contentResult.toString();
    let content2 = data.content2;
    let content2Result = '';
    try {
        console.log(content2);
        content2Result = await processor.process(content2);
        console.log(content2Result);
        content2Result = content2Result.toString();
    } catch (e) {
        console.log(e);
    }
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Approach</h1>
                <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
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
                
                <div dangerouslySetInnerHTML={{ __html: content2Result }}></div>
            </div>
        </main>
    )
}
