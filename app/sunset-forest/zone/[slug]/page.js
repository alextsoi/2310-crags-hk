import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export async function generateMetadata({ params }) {
    let matchedBoulders = boulders.data.filter((boulder) => {
        return boulder.zone === parseInt(params.slug)
    });
    let matchedBoulderIds = _.map(matchedBoulders, 'id');
    if (matchedBoulders.length > 0) {
        let matchedRoutes = routes.data.filter((route) => matchedBoulderIds.includes(route.boulder));
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
        let ratingText;
        if (allRatings.length > 0 && allRatings[allRatings.length - 1] > 0) {
            ratingText = ' and rated with stars, we recommend you to come and try these problems.';
        } else {
            ratingText = '.';
        }
        let description = `There are total ${matchedRoutes.length} routes in the Sunset Forest Bouldering Zone ${params.slug}. The boulder problems are graded ${gradingText}${ratingText}`;
        return {
            title: `Zone ${params.slug} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            openGraph: {
                title: `Zone ${params.slug} Bouldering Problems | Sunset Forest Boulders | CRAGS.HK`,
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

export default function Zone({ params }) {
    const { slug } = params;

    const matchedBoulders = boulders.data.filter((boulder) => boulder.zone === parseInt(params.slug));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>Zone {params.slug}</h2>
                    {matchedBoulders.map((boulder) => {
                        return <section className={styles.boulder}>
                            <h2 className={styles.boulderTitle}><Link href={`/sunset-forest/boulder/${boulder.slug}`}>{boulder.id} {boulder.name}</Link></h2>
                            <ul className={styles.boulderRoutes}>
                                {routes.data.filter(route => route.boulder === boulder.id).map((route) => {
                                    let foundBoulder = boulders.data.find((boulder) => boulder.id === route.boulder);
                                    return <li className={styles.boulderRoute} key={route.id}>
                                        <Link href={{
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
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    let zones = _.uniq(_.map(boulders.data, 'zone'));
    return zones.map((zone) => {
        return {
            slug: '' + zone
        }
    })
}