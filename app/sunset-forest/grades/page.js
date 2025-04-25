import styles from '@/app/page.module.scss'
import Link from 'next/link'
import _ from 'lodash'
import fs from 'fs/promises';
import matter from 'gray-matter';

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

export default async function Grade() {
    let allRoutes = [];
    const routeFiles = await fs.readdir('src/routes');
    for (const file of routeFiles) {
        const fileContent = await fs.readFile(`src/routes/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allRoutes.push(data);
        }
    }

    allRoutes = allRoutes.map(route => {
        if (!Array.isArray(route.gradings)) {
            route.gradings = route.gradings.split(',');
            route.gradings = route.gradings.map(grading => {
                if (!isNaN(parseInt(grading))) {
                    return parseInt(grading);
                } else {
                    return grading.trim();
                }
            });
        }
        return route;
    });

    let allGradings = _.map(allRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    // First number, then string
    allGradings = _.sortBy(allGradings, Number);

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold mb-8">Sunset Forest Grade Listings</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {allGradings.map((grade) => {
                        const problemCount = allRoutes.filter(route => route.gradings.includes(grade)).length;
                        const gradeDisplay = grade !== 'project' ? `V${grade}` : 'Project';
                        const gradeTitle = grade !== 'project' ? `V${grade} problems` : 'Project Problems';
                        
                        return (
                            <section 
                                key={grade} 
                                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-semibold">
                                        <Link
                                            title={`${gradeTitle} | Sunset Forest Bouldering Grades | CRAGS.HK`}
                                            href={`/sunset-forest/grade/${grade}`}
                                            className="text-gray-800 hover:text-blue-600 transition-colors"
                                        >
                                            {gradeDisplay}
                                        </Link>
                                    </h3>
                                    <span className="text-gray-600 font-medium">
                                        {problemCount} problems
                                    </span>
                                </div>
                                
                                {grade !== 'project' && (
                                    <div className="mt-2 text-sm text-gray-500">
                                        {grade <= 2 ? 'Beginner' : 
                                         grade <= 4 ? 'Intermediate' : 
                                         grade <= 6 ? 'Advanced' : 'Expert'} level
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>

                <article className="prose prose-lg max-w-none space-y-6">
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
