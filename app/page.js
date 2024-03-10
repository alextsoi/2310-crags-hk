import Image from './_components/Image'
import ImageMap from './_components/ImageMap'
import styles from './page.module.scss'
// read md file and convert to json
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export default async function Home() {
    const filename = './src/landing.md';
    const file = path.join(process.cwd(), filename);
    const fileContent = await fs.readFile(file, 'utf8');
    const data = matter(fileContent).data;
    const content = data.content;
    let contentResult = await remark().use(html).process(content);
    contentResult = contentResult.toString();
    console.log(contentResult);
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>CRAGS.HK</h2>
                <h1>{data.title}</h1>
                <div className="map">
                    <ImageMap path="/common/sunset-forest-phase1a-w4800w.jpg" alt="Sunset Forest Bouldering Site Map Phase 1a | CRAGS.HK" />
                </div>
                <div className="map"><Image path="/common/sunset-forest-phase1b-1-w3200w.jpg" alt="Sunset Forest Bouldering Site Map Phase 1b | CRAGS.HK" /></div>
                <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
            </div>
        </main >
    )
}
