import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import blocs from '@/app/data/blocs.json'
import Link from 'next/link'
import _ from 'lodash'

export default function Rating() {
    let allRatings = _.map(routes.data, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>Ratings</h2>
                {allRatings.map((rating) => {
                    return <section key={rating} className={styles.rating}>
                        <h3><Link href={`/sunset-forest/rating/${rating}`}>{rating !== 0 ? `${rating} star` : 'Normal'}</Link></h3>
                    </section>;
                })}
            </div>
        </main>
    )
}
