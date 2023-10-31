import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';

export default function Rating({ params }) {
    const { slug } = params;
    const matchedRoutes = routes.data.filter((route) => route.rating === parseInt(slug));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>{parseInt(params.slug) === 0 ? 'Normal' : `${params.slug} Stars`}</h2>
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            let foundBoulder = boulders.data.find((boulder) => boulder.id === route.boulder);
                            return <li className={styles.boulderRoute} key={route.id}>
                                <Link href={{
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
