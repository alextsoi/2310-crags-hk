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
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-8">Sunset Forest Approach</h1>
                
                <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: contentResult }}></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {images && images.map((image, index) => (
                        <div 
                            key={index} 
                            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <img 
                                loading="lazy" 
                                width={396} 
                                height={704} 
                                src={image} 
                                alt={`Sunset Forest Bouldering Site Approach Step ${index + 1} | CRAGS.HK`}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                                Step {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content2Result }}></div>
            </div>
        </main>
    )
}
