import styles from '@/app/page.module.scss'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import Image from '@/app/_components/Image';
import fs from 'fs/promises';
import matter from 'gray-matter';

export async function generateMetadata({ params }) {
    const routeFiles = await fs.readdir('src/routes');
    let allRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.zone !== 'undefined' && data.zone === parseInt(params.slug)) {
                allRoutes.push(data);
            }
        }
    }
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.zone !== 'undefined' && data.zone === parseInt(params.slug)) {
                allBoulders.push(data);
            }
        }
    }
    allBoulders = _.sortBy(allBoulders, 'order');
    let matchedBoulders = allBoulders.filter((boulder) => boulder.zone === parseInt(params.slug));
    matchedBoulders = matchedBoulders.map(boulder => {
        boulder.id = boulder.id + '';
        return boulder;
    });
    let matchedBoulderIds = _.map(matchedBoulders, 'id');
    if (matchedBoulders.length > 0) {
        let matchedRoutes = allRoutes.filter((route) => {
            return matchedBoulderIds.includes(route.boulder)
        });
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
        let description = `There are total ${matchedRoutes.length} routes in the Sunset Forest Bouldering Zone ${params.slug}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
        return {
            title: `Sunset Forest Zone ${params.slug} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            openGraph: {
                title: `Sunset Forest Zone ${params.slug} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
                description: description,
                url: `${websiteHost}sunset-forest/zone/${params.slug} `,
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

export default async function Zone({ params }) {
    const routeFiles = await fs.readdir('src/routes');
    let allRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.zone !== 'undefined' && data.zone === parseInt(params.slug)) {
                allRoutes.push(data);
            }
        }
    }
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            if (typeof data.zone !== 'undefined' && data.zone === parseInt(params.slug)) {
                allBoulders.push(data);
            }
        }
    }
    allBoulders = _.sortBy(allBoulders, 'order');
    let matchedBoulders = allBoulders.filter((boulder) => boulder.zone === parseInt(params.slug));
    matchedBoulders = matchedBoulders.map(boulder => {
        boulder.id = boulder.id + '';
        return boulder;
    });
    let description = null;
    let matchedBoulderIds = _.map(matchedBoulders, 'id');
    let matchedRoutes = allRoutes.filter((route) => {
        return matchedBoulderIds.includes(route.boulder)
    });
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
    description = `There are total ${matchedRoutes.length} routes in the Sunset Forest Bouldering Zone ${params.slug}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <section className="mb-12">
                    <h2 className="text-4xl font-bold mb-8">Zone {params.slug}</h2>
                    
                    <div className="space-y-12">
                        {allBoulders.map((boulder, boulderKey) => (
                            <section 
                                key={boulderKey} 
                                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold">
                                        <Link 
                                            title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} 
                                            href={`/sunset-forest/boulder/${boulder.slug}`}
                                            className="text-gray-800 hover:text-blue-600 transition-colors"
                                        >
                                            {boulder.id} {boulder.name}
                                        </Link>
                                    </h2>
                                </div>

                                {boulder.image && (
                                    <div className="mb-6 overflow-hidden rounded-lg">
                                        <Link 
                                            title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} 
                                            href={`/sunset-forest/boulder/${boulder.slug}`}
                                        >
                                            <Image 
                                                path={boulder.image} 
                                                hideFullView={true}
                                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>
                                    </div>
                                )}

                                <ul className="space-y-2">
                                    {matchedRoutes
                                        .filter(route => `${route.boulder}` === `${boulder.id}`)
                                        .map((route) => {
                                            let foundBoulder = allBoulders.find((boulder) => `${boulder.id}` === `${route.boulder}`);
                                            return (
                                                <li 
                                                    key={route.id}
                                                    className="hover:bg-gray-200 rounded-md transition-colors"
                                                >
                                                    <Link
                                                        title={`${route.id} ${route.name} | ${boulder.id} ${boulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
                                                        href={{
                                                            pathname: `/sunset-forest/boulder/${foundBoulder.slug}`,
                                                            query: { problem: route.slug }
                                                        }}
                                                        className="flex items-center gap-2 p-3 text-gray-800 hover:text-blue-600"
                                                    >
                                                        <span className="font-medium min-w-[3rem]">
                                                            {route.id} -
                                                        </span>
                                                        <span className="flex-grow">
                                                            {route.name}
                                                            {route.isSds && <span className="text-gray-600 ml-1">(sds)</span>}
                                                            {route.rating !== 0 && (
                                                                <span className="text-yellow-500 ml-1">
                                                                    {ratingText[route.rating]}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            ({route.gradings.map(grade => 
                                                                grade !== 'project' ? `V${grade}` : grade
                                                            ).join('/')})
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </section>
                        ))}
                    </div>
                </section>

                {description && (
                    <article className="prose prose-lg max-w-none mt-12 p-6 bg-blue-50 rounded-lg">
                        {description}
                    </article>
                )}
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const zoneFiles = await fs.readdir('src/zones');
    let allZones = [];
    for (const file of zoneFiles) {
        const fileContent = await fs.readFile(`src/zones/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allZones.push(data);
        }
    }
    return allZones.map((zone) => {
        return {
            slug: `${zone.id}`
        }
    })
}