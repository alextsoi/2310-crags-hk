import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import blocs from '@/app/data/blocs.json'
import Link from 'next/link'
import _ from 'lodash'

export default function Zone() {
    let allZones = _.map(blocs.data, 'zone');
    allZones = _.uniq(allZones);
    allZones = _.sortBy(allZones, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>Zones</h2>
                {allZones.map((zone) => {
                    return <section key={zone} className={styles.zone}>
                        <h3><Link href={`/zone/${zone}`}>Zone {zone}</Link></h3>
                    </section>;
                })}
            </div>
        </main>
    )
}
