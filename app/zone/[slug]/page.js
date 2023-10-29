import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import blocs from '@/app/data/blocs.json'
import Link from 'next/link'
import _ from 'lodash';

export default function Zone({params}) {
    const ratingText = ['', '*', '**', '***']
    const { slug } = params;
    const matchedBlocs = blocs.data.filter((bloc) => bloc.zone === parseInt(params.slug));
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.bloc}>
                    <h2>Zone {params.slug}</h2>
                    {matchedBlocs.map((bloc) => {
                        return <section className={styles.bloc}>
                            <h2>{bloc.id} - {bloc.name}</h2>
                            <ul className={styles.blocRoutes}>
                                {routes.data.filter(route => route.blocs === bloc.id).map((route) => {
                                    return <li className={styles.blocRoute} key={route.id}>
                                        <Link href={`#`}>
                                            <div className={styles.blocRouteGrade}>{route.gradings.map(grade => grade !== 'project' ? `V${grade}` : grade).join('/')}</div>
                                            <div className={styles.blocRouteId}>{route.id} - </div>
                                            <div className={styles.blocRouteName}>{route.name}{route.isSds ? ' (sds)' : ''}{route.rating !== 0 ? ratingText[route.rating] : ''}</div>
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
    let zones = _.uniq(_.map(blocs.data, 'zone'));
    return zones.map((zone) => {
        return {
            slug: '' + zone
        }
    })
}