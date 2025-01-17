import { websiteHost } from "./_helpers/config"
import _ from 'lodash'
import fs from 'fs/promises';
import matter from 'gray-matter';

export default async function sitemap() {
    let sitemapList = [
        {
            url: websiteHost,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${websiteHost}sunset-forest/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${websiteHost}sunset-forest/approach/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${websiteHost}sunset-forest/boulders/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${websiteHost}sunset-forest/grades/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${websiteHost}sunset-forest/ratings/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${websiteHost}sunset-forest/zones/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        }
    ];
    const boulderFiles = await fs.readdir('src/boulders');
    let allBoulders = [];
    for (const file of boulderFiles) {
        const fileContent = await fs.readFile(`src/boulders/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allBoulders.push(data);
        }
    }
    // Add all boulders
    allBoulders.forEach(boulder => {
        sitemapList.push({
            url: `${websiteHost}sunset-forest/boulder/${boulder.slug}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        });
    });

    // Add all zones
    const zoneFiles = await fs.readdir('src/zones');
    let allZones = [];
    for (const file of zoneFiles) {
        const fileContent = await fs.readFile(`src/zones/${file}`, 'utf8');
        const data = matter(fileContent).data;
        if (typeof data.published !== 'undefined' && data.published) {
            allZones.push(data);
        }
    }
    allZones.forEach((zone) => {
        sitemapList.push({
            url: `${websiteHost}sunset-forest/zone/${zone.id}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        });
    });

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

    // Add all grades
    let allGradings = _.map(allRoutes, 'gradings');
    allGradings = _.flattenDeep(allGradings);
    allGradings = _.uniq(allGradings);
    allGradings = _.sortBy(allGradings, Number);
    allGradings.forEach((grade) => {
        sitemapList.push({
            url: `${websiteHost}sunset-forest/grade/${grade}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        });
    });

    // Add all ratings
    let allRatings = _.map(allRoutes, 'rating');
    allRatings = _.uniq(allRatings);
    allRatings = _.sortBy(allRatings, String);
    allRatings.forEach((rating) => {
        sitemapList.push({
            url: `${websiteHost}sunset-forest/rating/${rating}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        });
    });
    return sitemapList;
}