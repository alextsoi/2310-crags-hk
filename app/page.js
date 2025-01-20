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
                    <h2>{data.subtitle}</h2>
                    <iframe className={styles.alltrails} src={data.mapUrl} width="100%" style={{ height: '75vh', minHeight: '400px' }} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"></iframe>
                    <br /><br />
                    {data.externalMapUrl && <div>
                        <p><a href={data.externalMapUrl.url} target="_blank" rel="noopener noreferrer">{data.externalMapUrl.title}</a></p>
                        {data.externalMapUrl.description && <div>{data.externalMapUrl.description}</div>}
                    </div>}
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentResult }}></div>
            </div>
        </main >
    )
}
