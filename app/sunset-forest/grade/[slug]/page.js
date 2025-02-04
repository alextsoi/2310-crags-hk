import styles from '@/app/page.module.scss'
import Link from 'next/link'
import _ from 'lodash';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export async function generateMetadata({ params }) {
    let currentGrading = params.slug === 'project' ? params.slug : parseInt(params.slug);
    const routeFiles = await fs.readdir('src/routes');
    let matchedRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            matchedRoutes.push(data);
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
    matchedRoutes = matchedRoutes.filter((route) => route.gradings.includes(currentGrading));
    matchedRoutes = _.sortBy(matchedRoutes, 'id');

    let allRatings = _.map(matchedRoutes, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    let ratingTextDescription;
    if (allRatings.length > 0 && allRatings[allRatings.length - 1] > 0) {
        ratingTextDescription = ' The bouldering problems are rated with stars, we recommend you to come and try these problems.';
    } else {
        ratingTextDescription = '';
    }
    let description = `There are total ${matchedRoutes.length} routes graded as ${params.slug !== 'project' ? `V${params.slug}` : params.slug}.${ratingTextDescription}`;
    return {
        title: `${params.slug !== 'project' ? `V${params.slug} graded` : `Project graded`} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
        description: description,
        openGraph: {
            title: `${params.slug !== 'project' ? `V${params.slug} graded` : `Project graded`} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            url: `${websiteHost}sunset-forest/grade/${params.slug}`,
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
}

export default async function Grade({ params }) {
    const { slug } = params;
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allBoulders.push(data);
        }
    }

    const routeFiles = await fs.readdir('src/routes');
    let matchedRoutes = [];
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            matchedRoutes.push(data);
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
    matchedRoutes = matchedRoutes.filter((route) => route.gradings.includes(params.slug === 'project' ? slug : parseInt(slug)));
    matchedRoutes = _.sortBy(matchedRoutes, 'id');

    let description = null;
    let allRatings = _.map(matchedRoutes, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    let ratingTextDescription;
    if (allRatings.length > 0 && allRatings[allRatings.length - 1] > 0) {
        ratingTextDescription = ' The bouldering problems are rated with stars, we recommend you to come and try these problems.';
    } else {
        ratingTextDescription = '';
    }
    description = `There are total ${matchedRoutes.length} routes graded as ${params.slug !== 'project' ? `V${params.slug}` : params.slug}.${ratingTextDescription}`;

    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>{params.slug === 'project' ? 'Project' : `V${params.slug}`}</h2>
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            let foundBoulder = allBoulders.find((boulder) => `${boulder.id}` === `${route.boulder}`);
                            return <li className={styles.boulderRoute} key={route.id}>
                                <Link
                                    title={`${route.id} ${route.name} | ${foundBoulder.id} ${foundBoulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
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
                </section>
                {description && <article className={styles.articleParagraphs}>{description}</article>}
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    let allRoutes = [];
    const routeFiles = await fs.readdir('src/routes');
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

    let allGradings = _.map(allRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, Number);


    return allGradings.map((grade) => {
        return {
            slug: '' + grade
        }
    })
}
