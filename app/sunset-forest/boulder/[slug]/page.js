import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import Image from '@/app/_components/Image';
import Copy from '@/app/_components/Copy';

export async function generateMetadata({ params }) {
    let boulder = boulders.data.filter((boulder) => {
        return boulder.slug === params.slug
    });
    if (boulder.length > 0) {
        let matchedRoutes = routes.data.filter((route) => route.boulder === boulder[0].id);
        let allGradings = _.map(matchedRoutes, 'gradings');
        allGradings = _.flattenDeep(allGradings);
        allGradings = _.uniq(allGradings);
        allGradings = _.sortBy(allGradings, String);
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
        let description = `There are total ${matchedRoutes.length} routes on the ${boulder[0].name} Boulder that is located in zone ${boulder[0].zone}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
        return {
            title: `${boulder[0].name} Boulder | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            openGraph: {
                title: `${boulder[0].name} Boulder | Sunset Forest Boulders | CRAGS.HK`,
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

export default function Boulder({ params }) {
    const boulder = boulders.data.find((boulder) => {
        return boulder.slug === params.slug
    });
    const matchedRoutes = routes.data.filter((route) => route.boulder === boulder.id);
    let description = null;
    let allGradings = _.map(matchedRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, String);
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
                                {route.images && <div className={styles.boulderRouteImages}>
                                    {route.images.map((imagePath) => {
                                        return <Image path={imagePath} key={imagePath} />
                                    })}
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
    return boulders.data.map((boulder) => {
        return {
            slug: boulder.slug
        }
    })
}