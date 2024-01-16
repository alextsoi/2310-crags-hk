import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export async function generateMetadata({ params }) {
    let matchedRoutes = routes.data.filter((route) => route.rating === parseInt(params.slug));
    let allGradings = _.map(matchedRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, Number);
    let gradingText;
    if (allGradings.length > 1) {
        gradingText = `${allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project'} - ${allGradings[allGradings.length - 1] !== 'project' ? `V${allGradings[allGradings.length - 1]}` : 'project'}`;
    } else {
        gradingText = allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project';
    }
    let ratingTextDescription = '.';
    let description = `There are total ${matchedRoutes.length} routes in the Sunset Forest Bouldering Site rated with ${params.slug === '0' ? 'normal' : `${params.slug} stars`}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
    return {
        title: `Sunset Forest Bouldering Problems rated with ${params.slug === '0' ? 'normal' : `${params.slug} stars`} | Sunset Forest Boulders | CRAGS.HK`,
        description: description,
        openGraph: {
            title: `Sunset Forest Bouldering Problems rated with ${params.slug === '0' ? 'normal' : `${params.slug} stars`} | Sunset Forest Boulders | CRAGS.HK`,
            description: description,
            url: `${websiteHost}sunset-forest/rating/${params.slug} `,
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

export default function Rating({ params }) {
    const { slug } = params;
    const matchedRoutes = routes.data.filter((route) => route.rating === parseInt(slug));
    let description = null;
    let allGradings = _.map(matchedRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, Number);
    let gradingText;
    if (allGradings.length > 1) {
        gradingText = `${allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project'} - ${allGradings[allGradings.length - 1] !== 'project' ? `V${allGradings[allGradings.length - 1]}` : 'project'}`;
    } else {
        gradingText = allGradings[0] !== 'project' ? `V${allGradings[0]}` : 'project';
    }
    let ratingTextDescription = '.';
    description = `There are total ${matchedRoutes.length} routes in the Sunset Forest Bouldering Site rated with ${params.slug === '0' ? 'normal' : `${params.slug} stars`}. The boulder problems are graded ${gradingText}${ratingTextDescription}`;
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>{parseInt(params.slug) === 0 ? 'Normal' : `${params.slug} Stars`}</h2>
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            let foundBoulder = boulders.data.find((boulder) => boulder.id === route.boulder);
                            return <li className={styles.boulderRoute} key={route.id}>
                                <Link 
                                title={`${route.id} ${route.name} | ${foundBoulder.id} ${foundBoulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
                                href={{
                                    pathname: `/sunset-forest/boulder/${foundBoulder.slug}`,
                                    query: { problem: route.slug }
                                }}>
                                    <div className={styles.boulderRouteId}>{route.id} -</div>
                                    <div className={styles.boulderRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}</div>
                                    <div className={styles.boulderRouteGrade}>{route.gradings.map(grade => grade !== 'project' ? `V${grade}` : grade).join('/')}</div>
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
    let allRatings = _.map(routes.data, 'rating');
    let ratings = _.uniq(allRatings);
    return ratings.map((rating) => {
        return {
            slug: '' + rating
        }
    })
}
