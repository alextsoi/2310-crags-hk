import styles from '@/app/page.module.scss'
import Link from 'next/link'
import { ratingText, siteName, websiteHost } from '@/app/_helpers/config';
import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter'
import _ from 'lodash';

export const metadata = {
    title: 'Sunset Forest Boulder Problem Listings | CRAGS.HK',
    description: 'Find all the boulder problems at Sunset Forest on CRAGS.HK, neatly organized by boulders. Stay updated with our regular updates and use our search function to find specific problems quickly and easily. Your complete guide to bouldering in Sunset Forest.',
    openGraph: {
        title: 'Sunset Forest Boulder Problem Listings | CRAGS.HK',
        description: 'Find all the boulder problems at Sunset Forest on CRAGS.HK, neatly organized by boulders. Stay updated with our regular updates and use our search function to find specific problems quickly and easily. Your complete guide to bouldering in Sunset Forest.',
        url: `${websiteHost}sunset-forest`,
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

export default async function Home() {
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allBoulders.push(data);
        }
    }

    allBoulders = _.sortBy(allBoulders, 'order');

    const routeFiles = await fs.readdir('src/routes');
    let allRoutes = [];
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

    allRoutes = _.sortBy(allRoutes, 'id');

    return (
        <main className={styles.main}>
            <div className="container">
                <h1>Sunset Forest Boulder Problem Listings</h1>
                <p>Total <strong>{allRoutes.length}</strong> boulder problems developed.</p>
                <iframe className={styles.alltrails} src="https://www.alltrails.com/widget/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" width="100%" style={{ height: '75vh', minHeight: '400px' }} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="AllTrails: Trail Guides and Maps for Hiking, Camping, and Running"></iframe>
                <br /><br />
                <div><a href="https://www.alltrails.com/explore/map/morning-hike-f00e1df-82?u=m&sh=s1yzdt" target="_blank" rel="noopener noreferrer">Save Sunset Forest Map on AllTrails</a></div>
                {allBoulders.map((boulder) => {
                    return <section className={styles.boulder}>
                        <h2 className={styles.boulderTitle}><Link title={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`} href={`/sunset-forest/boulder/${boulder.slug}`}>{boulder.id} {boulder.name} Boulder</Link></h2>
                        {boulder.access && <div className={styles.boulderAccess}><a href={boulder.access.link} title={boulder.access.title} target={boulder.access.target ? boulder.access.target : '_blank'}>{boulder.access.text}</a></div>}
                        <ul className={styles.boulderRoutes}>
                            {allRoutes.filter(route => `${route.boulder}` === `${boulder.id}`).map((route) => {
                                let foundBoulder = allBoulders.find((boulder) => `${boulder.id}` === `${route.boulder}`);
                                return <li className={styles.boulderRoute} key={route.id}>
                                    <Link
                                        title={`${route.id} ${route.name} | ${boulder.id} ${boulder.name} | Sunset Forest Bouldering Problems | CRAGS.HK`}
                                        href={{
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
                <article className={styles.articleParagraphs}>
                    <p>Welcome to the most comprehensive list of boulder problems at Sunset Forest, your go-to resource at CRAGS.HK. Our listings are meticulously organized by boulders, making it easy for you to navigate and find the specific problems you're interested in.</p>
                    <p>From the most challenging routes to beginner-friendly problems, our guide covers it all. Each problem is detailed with its grade and any additional notes that might help you on your climbing journey. Our aim is to make your bouldering experience at Sunset Forest as enjoyable and fulfilling as possible.</p>
                    <p>What sets our guide apart is the regular updates we provide. We understand that conditions can change, new problems can be set, and old ones might evolve; that's why we make sure our guide is always up-to-date.</p>
                    <p>To make things even easier, we've integrated a search function into our page. Whether you're looking for a specific problem, a particular grade, or a certain boulder, a quick search will get you the information you need in no time.</p>
                    <p>Join us in exploring the joy of bouldering at Sunset Forest. Whether you're planning your next visit or looking to challenge yourself with a new problem, CRAGS.HK is your trusted companion.</p>
                    <p>Stay tuned for updates and remember, the only way is up!</p>
                </article>
            </div>
        </main >
    )
}
