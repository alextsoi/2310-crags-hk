import Image from './_components/Image'
import ImageMap from './_components/ImageMap'
import styles from './page.module.scss'
// read md file and convert to json
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'
import html from 'remark-html'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

export default async function Home() {
    const filename = './src/landing.md';
    const file = path.join(process.cwd(), filename);
    const fileContent = await fs.readFile(file, 'utf8');
    const data = matter(fileContent).data;
    const content = data.content;
    let processor = unified().use(remarkParse).use(html);
    let contentResult = await processor.process(content);
    contentResult = contentResult.toString();
    console.log(contentResult);
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>CRAGS.HK</h2>
                <h1>{data.title}</h1>
                <div className="new-map">
                    <h2>New version of map displayed through AllTrails</h2>
                    <iframe className={styles.alltrails} src="https://www.alltrails.com/widget/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" width="100%" style={{ height: '75vh', minHeight: '400px' }} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"></iframe>
                    <br/><br/>
                    <div><a href="https://www.alltrails.com/explore/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" target="_blank" rel="noopener noreferrer">Save Sunset Forest Map on AllTrails</a><br/><br/>We disabled the old quick view maps on this page because it is difficult to maintain and locate yourself on the map. Through the above AllTrails map, you can explore all the locations of the boulders. Clicking the above save link will redirect you to install the AllTrails app on your phone and bookmark the map, so that you can identify yourself's GPS location on the map.</div>
                </div>
            {/* <div className="map">
                    <ImageMap path="/common/sunset-forest-phase1a-w4800w.jpg" alt="Sunset Forest Bouldering Site Map Phase 1a | CRAGS.HK" />
                </div>
                <div className="map">
                    <Image path="/common/sunset-forest-phase1b-1-w3200w.jpg" alt="Sunset Forest Bouldering Site Map Phase 1b | CRAGS.HK" />
                </div> */}
            <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
        </div>
        </main >
    )
}
