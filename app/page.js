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
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h2 className="text-xl font-bold mb-2">CRAGS.HK</h2>
                <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">{data.subtitle}</h2>
                    <iframe 
                        className="w-full h-[75vh] min-h-[400px] rounded-lg shadow-lg" 
                        src={data.mapUrl} 
                        frameBorder="0" 
                        scrolling="no" 
                        title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"
                    />
                    {data.externalMapUrl && (
                        <div className="mt-8 space-y-2">
                            <p>
                                <a 
                                    href={data.externalMapUrl.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    {data.externalMapUrl.title}
                                </a>
                            </p>
                            {data.externalMapUrl.description && (
                                <div className="text-gray-700">
                                    {data.externalMapUrl.description}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-12 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contentResult }}></div>
            </div>
        </main>
    )
}
