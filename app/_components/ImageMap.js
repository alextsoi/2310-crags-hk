"use client";
import boulders from '@/app/data/boulders.json';
import images from '@/app/data/images.json';

function getNormalSizeImage(path) {
    return '/images' + path;
}

export default function ImageMap(props) {
    const { path, alt } = props;

    return <div>
        <svg
            version="1.1"
            viewBox="0 0 4800 4132"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg">
            <title>{alt || images[path]}</title>
            <g>
                <image
                    width="4800"
                    height="4132"
                    style={{ "image-rendering": "optimizeSpeed", fill: "#ffffff", "fill-opacity": 1 }}
                    xlinkHref={getNormalSizeImage(path)}
                    id="image" />

                {boulders.data.filter((boulder) => boulder.image_map).map((boulder) => {
                    const { image_map: circle } = boulder
                    return <a id={`a-${boulder.id.replace(".", "-")}`}
                        xlinkHref={`/sunset-forest/boulder/${boulder.slug}`}
                        xlinkTitle={`${boulder.id} ${boulder.name} | Sunset Forest Boulders | CRAGS.HK`}
                        target="_blank">
                        <circle
                            style={{ opacity: 0, fill: "#ffffff", "fill-opacity": 1 }}
                            id={`path-${boulder.id.replace(".", "-")}`}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={circle.r} />
                    </a>;
                })}
            </g>
        </svg>
        {(typeof hideFullView === 'undefined' || !hideFullView || hideFullView === false) && <div><a href={getNormalSizeImage(path)} target="_blank" title={alt || images[path]}>View full size</a></div>}
    </div>
}
