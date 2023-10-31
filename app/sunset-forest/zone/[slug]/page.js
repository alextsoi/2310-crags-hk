import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash';
import { ratingText } from '@/app/_helpers/config';

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
                            <h2>{boulder.id} - {boulder.name}</h2>
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