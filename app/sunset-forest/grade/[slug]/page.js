import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText } from '@/app/_helpers/config';

export default function Grade({ params }) {
    const { slug } = params;
    const matchedRoutes = routes.data.filter((route) => route.gradings.includes(params.slug === 'project' ? slug : parseInt(slug)));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>{params.slug === 'project' ? 'Project' : `V${params.slug}`}</h2>
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            let foundBoulder = boulders.data.find((boulder) => boulder.id === route.boulder);
                            return <li className={styles.boulderRoute} key={route.id}>
                                <Link href={{
                                    pathname: `/sunset-forest/boulder/${foundBoulder.slug}`,
                                    query: { problem: route.slug }
                                }}>
                                    <div className={styles.boulderRouteGrade}>{route.gradings.map(grade => grade !== 'project' ? `V${grade}` : grade).join('/')}</div>
                                    <div className={styles.boulderRouteId}>{route.id} - </div>
                                    <div className={styles.boulderRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</div>
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
    let allGradings = _.map(routes.data, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, String);
    return allGradings.map((grade) => {
        return {
            slug: '' + grade
        }
    })
}
