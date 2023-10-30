import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import Link from 'next/link'
import _ from 'lodash'

import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export const metadata = {
    title: 'Sunset Forest Boulder Problem Grades | CRAGS.HK',
    description: 'Discover the detailed grading of all boulder problems in Sunset Forest on CRAGS.HK. Our comprehensive guide helps you find challenges that align with your abilities and track your progress."',
    openGraph: {
        title: 'Sunset Forest Boulder Problem Grades | CRAGS.HK',
        description: 'Discover the detailed grading of all boulder problems in Sunset Forest on CRAGS.HK. Our comprehensive guide helps you find challenges that align with your abilities and track your progress."',
        url: `${websiteHost}sunset-forest/grades`,
        siteName: siteName,
        images: [
            {
                url: `${websiteHost}og-image.jpg`,
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
}

export default function Grade() {
    let allGradings = _.map(routes.data, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Grade Listings</h1>
                {allGradings.map((grade) => {
                    return <section key={grade} className={styles.grade}>
                        <h3><Link href={`/sunset-forest/grade/${grade}`}>{grade !== 'project' ? `V${grade}` : 'Project'}</Link><span className={styles.problemCount}>x {routes.data.filter(route => route.gradings.includes(grade)).length}</span></h3>
                    </section>;
                })}
                <article className={styles.articleParagraphs}>
                    <p>Welcome to the most extensive list of boulder problem grades in Sunset Forest, exclusively on CRAGS.HK. Our guide is designed to provide you with a clear understanding of the range and specifics of different grades we've assigned to the problems across all developed blocs.</p>
                    <p>At CRAGS.HK, we understand the importance of accurate grading for every climber's journey. Whether you're a beginner looking to gradually build your skills or an experienced climber seeking a new challenge, knowing the grade of a problem can significantly enhance your bouldering experience.</p>
                    <p>That's why we've compiled a comprehensive list of all grades assigned to the boulder problems in Sunset Forest. Each grade in this list is accompanied by a selection of problems of that level, helping you to easily identify challenges that align with your abilities.</p>
                    <p>Moreover, we've included detailed descriptions for each grade, explaining what kind of technical skills, strength, and experience are typically required to complete problems of that level. This way, you can continuously push your limits and track your progress as you master higher grades.</p>
                    <p>CRAGS.HK is committed to fostering a supportive and inclusive climbing community. We encourage climbers to share their experiences, tips, and feedback, helping each other in the collective journey of bouldering.</p>
                    <p>Join us, and let's conquer the boulders of Sunset Forest one grade at a time!</p>
                </article>
            </div>
        </main>
    )
}
