import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import blocs from '@/app/data/blocs.json'
import Link from 'next/link'
import _ from 'lodash';

export default function Rating({ params }) {
    const { slug } = params;
    const matchedRoutes = routes.data.filter((route) => route.rating === parseInt(slug));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.bloc}>
                    <h2>{parseInt(params.slug) === 0 ? 'Normal' : `${params.slug} Stars`}</h2>
                    <ul className={styles.blocRoutes}>
                        {matchedRoutes.map((route) => {
                            return <li className={styles.blocRoute} key={route.id}>
                                <Link href={`/route/${route.slug}`}>
                                    <div className={styles.blocRouteGrade}>{route.gradings.map(grade => grade !== 'project' ? `V${grade}` : grade).join('/')}</div>
                                    <div className={styles.blocRouteId}>{route.id} - </div>
                                    <div className={styles.blocRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}</div>
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
            params: {
                slug: rating
            }
        }
    })
}
