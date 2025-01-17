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
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>Zone {params.slug}</h2>
                    {allBoulders.map((boulder) => {
                        return <section className={styles.boulder}>
                            <h2 className={styles.boulderTitle}><Link title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} href={`/sunset-forest/boulder/${boulder.slug}`}>{boulder.id} {boulder.name}</Link></h2>
                            {boulder.image && <div className={styles.boulderSignautreImage}><Link title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} href={`/sunset-forest/boulder/${boulder.slug}`}><Image path={boulder.image} hideFullView={true} /></Link></div>}
                            <ul className={styles.boulderRoutes}>
                                {matchedRoutes.filter(route => {
                                    return `${route.boulder}` === `${boulder.id}`
                                }).map((route) => {
                                    let foundBoulder = allBoulders.find((boulder) => `${boulder.id}` === `${route.boulder}`);
                                    return <li className={styles.boulderRoute} key={route.id}>
                                        <Link
                                            title={`${route.id} ${route.name} | ${boulder.id} ${boulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
                                            href={{
                                                pathname: `/sunset-forest/boulder/${foundBoulder.slug}`,
                                                query: { problem: route.slug }
                                            }}>
                                            <div className={styles.boulderRouteId}>{route.id} -</div>
                                            <div className={styles.boulderRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</div>
                                            <div className={styles.boulderRouteGrade}>({route.gradings.map(grade => grade !== 'project' ? `V${grade}` : `${grade}`).join('/')})</div>
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </section>;
                    })}
                </section>
                {description && <article className={styles.articleParagraphs}>{description}</article>}
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