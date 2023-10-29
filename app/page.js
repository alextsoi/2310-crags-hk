import Image from 'next/image'
import styles from './page.module.scss'
import routes from './data/routes.json'
import blocs from './data/blocs.json'
import Link from 'next/link'

export default function Home() {
    const ratingText = ['', '*', '**', '***']
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Problems</h1>
                {blocs.data.map((bloc) => {
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
            </div>
        </main>
    )
}
