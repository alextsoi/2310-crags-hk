import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash'

export default function Zone() {
    let allZones = _.map(boulders.data, 'zone');
    allZones = _.uniq(allZones);
    allZones = _.sortBy(allZones, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Zone Listings</h1>
                {allZones.map((zone) => {
                    return <section key={zone} className={styles.zone}>
                        <h3><Link href={`/sunset-forest/zone/${zone}`}>Zone {zone}</Link><span className={styles.problemCount}>x {routes.data.filter(route => route.zone === zone).length}</span></h3>
                    </section>;
                })}
            </div>
        </main>
    )
}
