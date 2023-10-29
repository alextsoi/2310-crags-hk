import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import blocs from '@/app/data/blocs.json'
import Link from 'next/link'

export default function Bloc({ params }) {
    const bloc = blocs.data.find((bloc) => bloc.slug === params.slug);
    const matchedRoutes = routes.data.filter((route) => route.blocs === bloc.id);
    const ratingText = ['', '*', '**', '***']
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.bloc}>
                    <h2>{bloc.id} - {bloc.name}</h2>
                    <ul className={styles.blocRoutes}>
                        {matchedRoutes.map((route) => {
                            return <li className={styles.blocRoute} key={route.id}>
                                <Link href={`/route/${route.slug}`}>
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
    return blocs.data.map((bloc) => {
        return {
            params: {
                slug: bloc.slug
            }
        }
    })
}
