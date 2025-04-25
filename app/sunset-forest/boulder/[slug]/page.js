import styles from '@/app/page.module.scss'
import _ from 'lodash';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import Image from '@/app/_components/Image';
import Copy from '@/app/_components/Copy';
import fs from 'fs/promises';
import matter from 'gray-matter';

async function getBoulder(slug) {
    const boulderFiles = await fs.readdir('src/boulders');
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.slug !== 'undefined' && data.slug === slug) {
                return data;
            }
        }
    }
    return null;
}

export async function generateMetadata({ params }) {
    let boulder = await getBoulder(params.slug);
    if (boulder) {
        const routeFiles = await fs.readdir('src/routes');
        let matchedRoutes = [];
        for (const file of routeFiles) {
            const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
            const data = matter(fileContent).data;
            if (typeof data.published !== 'undefined' && data.published) {
                if (typeof data.boulder !== 'undefined' && `${data.boulder}` === `${boulder.id}`) {
                    matchedRoutes.push(data);
                }
            }
        }
        matchedRoutes = matchedRoutes.map(route => {
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
        matchedRoutes = _.sortBy(matchedRoutes, 'id');

        let allGradings = _.map(matchedRoutes, 'gradings');
        allGradings = _.flattenDeep(allGradings);
        allGradings = _.uniq(allGradings);
        allGradings = _.sortBy(allGradings, Number);
        let allRatings = _.map(matchedRoutes, 'rating');
        allRatings = _.uniq(allRatings);
        allRatings = _.sortBy(allRatings, String);
        let gradingText;
        if (allGradings.length > 1) {
            gradingText = `${allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project'} - ${allGradings[allGradings.length - 1] !== 'project' ? `V${allGradings[allGradings.length - 1]}` : 'project'}`;
        } else {
            gradingText = allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project';
        }
        let ratingTextDescription;
        if (allRatings.length > 0 && allRatings[allRatings.length - 1] > 0) {
            ratingTextDescription = ' and rated with stars, we recommend you to come and try these problems.';
        } else {
            ratingTextDescription = '.';
        }
        let description = `There are total ${matchedRoutes.length} routes on the ${boulder.name} Boulder that is located in zone ${boulder.zone}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
        return {
            title: `${boulder.name} Boulder | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            openGraph: {
                title: `${boulder.name} Boulder | Sunset Forest Boulders | CRAGS.HK`,
                description: description,
                url: `${websiteHost}sunset-forest/boulder/${boulder.slug} `,
                siteName: siteName,
                images: [
                    {
                        url: `${websiteHost} og - image.jpg`,
                        width: 1200,
                        height: 630,
                    },
                ],
                locale: 'en_US',
                type: 'website',
            },
        }
    } else {
        return null;
    }
}

export default async function Boulder({ params }) {
    let boulder = await getBoulder(params.slug);
    const routeFiles = await fs.readdir('src/routes');
    let matchedRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.boulder !== 'undefined' && `${data.boulder}` === `${boulder.id}`) {
                matchedRoutes.push(data);
            }
        }
    }
    matchedRoutes = matchedRoutes.map(route => {
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
    matchedRoutes = _.sortBy(matchedRoutes, 'id');
    let description = null;
    let allGradings = _.map(matchedRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, Number);
    let allRatings = _.map(matchedRoutes, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    let gradingText;
    if (allGradings.length > 1) {
        gradingText = `${allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project'} - ${allGradings[allGradings.length - 1] !== 'project' ? `V${allGradings[allGradings.length - 1]}` : 'project'}`;
    } else {
        gradingText = allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project';
    }
    let ratingTextDescription;
    if (allRatings.length > 0 && allRatings[allRatings.length - 1] > 0) {
        ratingTextDescription = ' and rated with stars, we recommend you to come and try these problems.';
    } else {
        ratingTextDescription = '.';
    }
    description = `There are total ${matchedRoutes.length} routes on the ${boulder.name} Boulder that is located in zone ${boulder.zone}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-600 mb-2">Sunset Forest Boulders</h2>
                    <h1 className="text-4xl font-bold mb-8">{boulder.id} {boulder.name} Boulder</h1>
                    
                    {boulder.access && (
                        <div className="mb-4">
                            <a 
                                href={boulder.access.link} 
                                title={boulder.access.title} 
                                target={boulder.access.target ? boulder.access.target : '_blank'}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                {boulder.access.text}
                            </a>
                        </div>
                    )}
                    
                    {boulder.gps && (
                        <div className="flex items-center gap-3 mb-8 text-sm">
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${boulder.gps.lat},${boulder.gps.lng}`} 
                                title="Google Map" 
                                target="_blank"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Google Map
                            </a>
                            <span className="text-gray-400">or</span>
                            <Copy 
                                value={`${boulder.gps.lat}, ${boulder.gps.lng}`} 
                                text={`Click to copy (${boulder.gps.lat}, ${boulder.gps.lng})`}
                            />
                        </div>
                    )}

                    <div className="space-y-12">
                        {matchedRoutes.map((route) => (
                            <div key={route.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                                {route.image && (
                                    <div className="mb-6 overflow-hidden rounded-lg">
                                        <Image 
                                            path={route.image}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-medium text-gray-600 min-w-[3rem]">
                                        {route.id} -
                                    </span>
                                    <span className="flex-grow font-semibold">
                                        {route.name}
                                        {route.isSds && (
                                            <span className="text-gray-600 ml-2">(sds)</span>
                                        )}
                                        {route.rating !== 0 && (
                                            <span className="text-yellow-500 ml-2">
                                                {ratingText[route.rating]}
                                            </span>
                                        )}
                                    </span>
                                    <span className="text-gray-600 font-medium">
                                        ({route.gradings.map(grade => 
                                            grade !== 'project' ? `V${grade}` : `${grade}`
                                        ).join('/')})
                                    </span>
                                </div>

                                {route.description && (
                                    <div className="text-gray-600 text-sm">
                                        {route.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {description && (
                    <article className="prose prose-lg max-w-none p-6 bg-blue-50 rounded-lg">
                        {description}
                    </article>
                )}
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allBoulders.push(data);
        }
    }
    return allBoulders.map((boulder) => {
        return {
            slug: boulder.slug
        }
    })
}