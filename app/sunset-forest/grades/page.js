import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import Link from 'next/link'
import _ from 'lodash'

export default function Grade() {
    let allGradings = _.map(routes.data, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>Grades</h2>
                {allGradings.map((grade) => {
                    return <section key={grade} className={styles.grade}>
                        <h3><Link href={`/sunset-forest/grade/${grade}`}>{grade !== 'project' ? `V${grade}` : 'Project'}</Link></h3>
                    </section>;
                })}
            </div>
        </main>
    )
}
