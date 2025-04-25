const fs = require('fs/promises');
const path = require('path');

async function generateRouteFiles() {
    // Read routes.json
    const routesData = JSON.parse(
        await fs.readFile('app/data/routes.json', 'utf8')
    );

    // Create routes directory if it doesn't exist
    const routesDir = 'src/routes';
    await fs.mkdir(routesDir, { recursive: true });

    // Generate a file for each route
    for (const route of routesData.data) {
        const fileName = `2025-01-17-${route.id.replace(/\./g, '-')}.md`;
        const filePath = path.join(routesDir, fileName);

        // Create frontmatter
        const frontmatter = {
            published: true,
            name: route.name,
            slug: route.slug,
            isSds: route.isSds,
            rating: route.rating,
            gradings: route.gradings.join(', '),
            boulder: route.boulder,
            zone: route.zone,
            id: route.id,
            description: route.description || '',
            ...(route.images && { image: '/images' + route.images[0] }),
            ...(route.comment && { comment: route.comment[0] })
        };

        // Generate markdown content
        const content = `---
${Object.entries(frontmatter)
                .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                .join('\n')}
---

${route.description || ''}
`;

        // Write file
        await fs.writeFile(filePath, content);
        console.log(`Generated ${fileName}`);
    }
}

generateRouteFiles().catch(console.error); 