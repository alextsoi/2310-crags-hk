import styles from '@/app/page.module.scss'
import Link from 'next/link'
import _ from 'lodash'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import fs from 'fs/promises';
import matter from 'gray-matter';

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

export default async function Rating() {
    let allRoutes = [];
    const routeFiles = await fs.readdir('src/routes');
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allRoutes.push(data);
        }
    }

    let allRatings = _.map(allRoutes, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-8">Sunset Forest Rating Listings</h1>
                
                <div className="space-y-4">
                    {allRatings.map((rating, ratingKey) => {
                        const problemCount = allRoutes.filter(route => route.rating === rating).length;
                        const ratingTitle = rating !== 0 ? `${rating} star` : 'Normal';
                        const ratingDescription = rating !== 0 ? `Problems rated with ${rating} stars` : 'Normal Problems';
                        
                        return (
                            <section 
                                key={ratingKey} 
                                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-semibold flex items-center">
                                        <Link
                                            title={`${ratingDescription} | Sunset Forest Bouldering Grades | CRAGS.HK`}
                                            href={`/sunset-forest/rating/${rating}`}
                                            className="text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2"
                                        >
                                            {ratingTitle}
                                            {rating !== 0 && (
                                                <span className="text-yellow-400">
                                                    {'★'.repeat(rating)}
                                                </span>
                                            )}
                                        </Link>
                                    </h3>
                                    <span className="text-gray-600 font-medium">
                                        {problemCount} problems
                                    </span>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <article className="prose prose-lg max-w-none mt-12 space-y-6">
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
