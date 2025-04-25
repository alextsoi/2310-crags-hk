import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'
import _ from 'lodash';

export const metadata = {
    title: 'Sunset Forest Boulder Problem Listings | CRAGS.HK',
    description: 'Find all the boulder problems at Sunset Forest on CRAGS.HK, neatly organized by boulders. Stay updated with our regular updates and use our search function to find specific problems quickly and easily. Your complete guide to bouldering in Sunset Forest.',
    openGraph: {
        title: 'Sunset Forest Boulder Problem Listings | CRAGS.HK',
        description: 'Find all the boulder problems at Sunset Forest on CRAGS.HK, neatly organized by boulders. Stay updated with our regular updates and use our search function to find specific problems quickly and easily. Your complete guide to bouldering in Sunset Forest.',
        url: `${websiteHost}sunset-forest`,
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

export default async function Home() {
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

    const routeFiles = await fs.readdir('src/routes');
    let allRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allRoutes.push(data);
        }
    }

    allRoutes = allRoutes.map(route => {
        if (!Array.isArray(route.gradings)) {
            route.gradings = route.gradings.split(',');
            route.gradings = route.gradings.map(grading => {
                if (!isNaN(parseInt(grading))) {
                    return parseInt(grading);
                } else {
                    return grading.trim();
                }
            });
        }
        return route;
    });

    allRoutes = _.sortBy(allRoutes, 'id');

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-4">Sunset Forest Boulder Problem Listings</h1>
                <p className="text-lg mb-6">Total <strong>{allRoutes.length}</strong> boulder problems developed.</p>
                
                <iframe 
                    className="w-full h-[75vh] min-h-[400px] rounded-lg shadow-lg mb-4" 
                    src="https://www.alltrails.com/widget/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" 
                    frameBorder="0" 
                    scrolling="no" 
                    title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"
                />
                
                <div className="mb-8">
                    <a 
                        href="https://www.alltrails.com/explore/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Save Sunset Forest Map on AllTrails
                    </a>
                </div>

                {allBoulders.map((boulder, boulderKey) => (
                    <section key={boulderKey} className="mb-8 p-6 bg-gray-50 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">
                            <Link 
                                title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} 
                                href={`/sunset-forest/boulder/${boulder.slug}`}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {boulder.id} {boulder.name} Boulder
                            </Link>
                        </h2>
                        
                        {boulder.access && (
                            <div className="mb-4">
                                <a 
                                    href={boulder.access.link} 
                                    title={boulder.access.title} 
                                    target={boulder.access.target ? boulder.access.target : '_blank'}
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    {boulder.access.text}
                                </a>
                            </div>
                        )}

                        <ul className="space-y-2">
                            {allRoutes.filter(route => `${route.boulder}` === `${boulder.id}`).map((route) => {
                                let foundBoulder = allBoulders.find((boulder) => `${boulder.id}` === `${route.boulder}`);
                                return (
                                    <li key={route.id} className="hover:bg-gray-100 rounded p-2 transition-colors">
                                        <Link
                                            title={`${route.id} ${route.name} | ${boulder.id} ${boulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
                                            href={{
                                                pathname: `/sunset-forest/boulder/${foundBoulder.slug}`,
                                                query: { problem: route.slug }
                                            }}
                                            className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                                        >
                                            <span className="font-medium">{route.id} -</span>
                                            <span>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</span>
                                            <span className="text-gray-600">({route.gradings.map(grade => grade !== 'project' ? `V${grade}` : `${grade}`).join('/')})</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}

                <article className="prose prose-lg max-w-none mt-12 space-y-6">
                    <p>Welcome to the most comprehensive list of boulder problems at Sunset Forest, your go-to resource at CRAGS.HK. Our listings are meticulously organized by boulders, making it easy for you to navigate and find the specific problems you're interested in.</p>
                    <p>From the most challenging routes to beginner-friendly problems, our guide covers it all. Each problem is detailed with its grade and any additional notes that might help you on your climbing journey. Our aim is to make your bouldering experience at Sunset Forest as enjoyable and fulfilling as possible.</p>
                    <p>What sets our guide apart is the regular updates we provide. We understand that conditions can change, new problems can be set, and old ones might evolve; that's why we make sure our guide is always up-to-date.</p>
                    <p>To make things even easier, we've integrated a search function into our page. Whether you're looking for a specific problem, a particular grade, or a certain boulder, a quick search will get you the information you need in no time.</p>
                    <p>Join us in exploring the joy of bouldering at Sunset Forest. Whether you're planning your next visit or looking to challenge yourself with a new problem, CRAGS.HK is your trusted companion.</p>
                    <p>Stay tuned for updates and remember, the only way is up!</p>
                </article>
            </div>
        </main>
    )
}
