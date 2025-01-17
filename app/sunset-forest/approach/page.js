import styles from '@/app/page.module.scss'
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
    let images = data.images;
    let content = data.content;
    let processor = unified().use(remarkParse).use(html);
    let contentResult = await processor.process(content);
    contentResult = contentResult.toString();
    let content2 = data.content2;
    let content2Result = await processor.process(content2);
    content2Result = content2Result.toString();
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Approach</h1>
                <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
                <div className={styles.approachWrapper}>
                    {
                        images && images.map((image, index) => {
                            return (
                                <div key={index} className={styles.approach}>
                                    <img loading="lazy" width={396} height={704} src={image} alt={`Sunset Forest Bouldering Site Approach Step ${index + 1} | CRAGS.HK`} />
                                </div>
                            )
                        })
                    }
                </div>
                <div dangerouslySetInnerHTML={{ __html: content2Result }}></div>
            </div>
        </main>
    )
}
