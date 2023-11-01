import styles from '@/app/page.module.scss'
import routes from '@/app/data/routes.json'
import boulders from '@/app/data/boulders.json'
import Link from 'next/link'
import _ from 'lodash'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';

export const metadata = {
    title: 'Sunset Forest Boulder Problem Ratings | CRAGS.HK',
    description: 'Prioritize your climbing experience with our problem ratings guide on CRAGS.HK. From standard to 3-star problems, find the most rewarding climbs in Sunset Forest, especially when time is limited.',
    openGraph: {
        title: 'Sunset Forest Boulder Problem Ratings | CRAGS.HK',
        description: 'Prioritize your climbing experience with our problem ratings guide on CRAGS.HK. From standard to 3-star problems, find the most rewarding climbs in Sunset Forest, especially when time is limited.',
        url: `${websiteHost}sunset-forest/ratings`,
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

export default function Rating() {
    let allRatings = _.map(routes.data, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Rating Listings</h1>
                {allRatings.map((rating) => {
                    return <section key={rating} className={styles.rating}>
                        <h3><Link
                            title={`${rating !== 0 ? `Problems rated with ${rating} stars` : 'Normal Problems'} | Sunset Forest Bouldering Grades | CRAGS.HK`}
                            href={`/sunset-forest/rating/${rating}`}>{rating !== 0 ? `${rating} star` : 'Normal'}</Link><span className={styles.problemCount}>x {routes.data.filter(route => route.rating === rating).length} problems</span></h3>
                    </section>;
                })}
                <article className={styles.articleParagraphs}>
                    <p>Welcome to your essential guide to the boulder problem ratings in Sunset Forest, brought to you by CRAGS.HK. Our system rates each problem from standard to a maximum of 3 stars, enabling you to quickly identify the most highly recommended climbs.</p>
                    <p>At CRAGS.HK, we understand that your time at Sunset Forest is precious. You want to make the most of your climbing experience, especially if your visit is brief. That's why we've developed this rating system: to help you prioritize the most enjoyable and rewarding problems.</p>
                    <p>A 3-star rating indicates a must-try problem - a climb that offers an exceptional combination of technical challenge, aesthetic appeal, and overall fun. Problems with 2 stars are also highly recommended, offering a great climbing experience. 1-star problems are standard climbs, perfect for warm-ups or cooling down.</p>
                    <p>Our comprehensive list of ratings allows you to filter and select problems based on their star rating. If you're short on time or looking for the best that Sunset Forest has to offer, start with the 3-star problems. They represent the cream of the crop and promise an unforgettable climbing experience.</p>
                    <p>Remember, the joy of climbing comes not only from the challenge but also from the journey, the learning, and the community. So, whatever the star rating, every problem in Sunset Forest has its unique charm and lessons to offer.</p>
                    <p>Join us at CRAGS.HK, and let's explore the best of bouldering in Sunset Forest together!</p>
                </article>
            </div>
        </main>
    )
}
