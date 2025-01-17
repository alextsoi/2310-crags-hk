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
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>Sunset Forest Boulders</h2>
                    <h1>{boulder.id} {boulder.name} Boulder</h1>
                    {boulder.access && <div className={styles.boulderAccess}><a href={boulder.access.link} title={boulder.access.title} target={boulder.access.target ? boulder.access.target : '_blank'}>{boulder.access.text}</a></div>}
                    {boulder.gps && <div className={styles.boulderGps}><a href={`https://www.google.com/maps/search/?api=1&query=${boulder.gps.lat},${boulder.gps.lng}`} title="Google Map" target="_blank">Google Map</a> or <Copy value={`${boulder.gps.lat}, ${boulder.gps.lng}`} text={`Click to copy (${boulder.gps.lat}, ${boulder.gps.lng})`} /></div>}
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            return <li className={styles.boulderRoute} key={route.id}>
                                {route.image && <div className={styles.boulderRouteImages}>
                                    <Image path={route.image} />
                                </div>}
                                <div className={styles.boulderRouteTitle}>
                                    <div className={styles.boulderRouteId}>{route.id} -</div>
                                    <div className={styles.boulderRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</div>
                                    <div className={styles.boulderRouteGrade}>({route.gradings.map(grade => grade !== 'project' ? `V${grade}` : `${grade}`).join('/')})</div>
                                </div>
                                {route.description && <div className={styles.boulderRouteDescription}>{route.description}</div>}
                            </li>
                        })}
                    </ul>
                </section>
                {description && <article className={styles.articleParagraphs}>{description}</article>}
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