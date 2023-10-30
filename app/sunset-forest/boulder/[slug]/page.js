import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import { ratingText } from '@/app/_helpers/config';

export default function Boulder({ params }) {
    const boulder = boulders.data.find((boulder) => {
        return boulder.slug === params.slug
    });
    const matchedRoutes = routes.data.filter((route) => route.boulder === boulder.id);
    return (
        <main className={styles.main}>
            <div className="container">
                <section className={styles.boulder}>
                    <h2>Sunset Forest Boulders</h2>
                    <h1>{boulder.id} - {boulder.name} Boulder</h1>
                    <ul className={styles.boulderRoutes}>
                        {matchedRoutes.map((route) => {
                            return <li className={styles.boulderRoute} key={route.id}>
                                <Link href={`#`}>
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
    return boulders.data.map((boulder) => {
        return {
            slug: boulder.slug
        }
    })
}