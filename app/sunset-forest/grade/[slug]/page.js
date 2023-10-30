import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText } from '@/app/_helpers/config';

export default function Grade({ params }) {
    const { slug } = params;
    const matchedRoutes = routes.data.filter((route) => route.gradings.includes(params.slug === 'project' ? slug : parseInt(slug)));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.bloc}>
                    <h2>{params.slug === 'project' ? 'Project' : `V${params.slug}`}</h2>
                    <ul className={styles.blocRoutes}>
                        {matchedRoutes.map((route) => {
                            return <li className={styles.blocRoute} key={route.id}>
                                <Link href={`#`}>
                                    <div className={styles.blocRouteGrade}>{route.gradings.map(grade => grade !== 'project' ? `V${grade}` : grade).join('/')}</div>
                                    <div className={styles.blocRouteId}>{route.id} - </div>
                                    <div className={styles.blocRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</div>
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
    console.log(allGradings);
    return allGradings.map((grade) => {
        return {
            slug: '' + grade
        }
    })
}
