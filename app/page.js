import styles from './page.module.scss'

export default function Home() {
    return (
        <main className={styles.main}>
            <div className="container">
                <h2>CRAGS.HK</h2>
                <h1>Your Complete Guide to Bouldering and Climbing in Sunset Forest</h1>
                <div className="map"><a href="/images/common/sunset-forest-phase1a.jpg" target="_blank" title="Sunset Forest Bouldering Site Map | CRAGS.HK"><img loading="lazy" src="/images/common/sunset-forest-phase1a.jpg" alt="Sunset Forest Bouldering Site Map | CRAGS.HK" /></a></div>
                <p>Explore Sunset Forest, one of the premier bouldering and climbing sites in Hong Kong, all at your fingertips. At CRAGS.HK, we provide comprehensive access to detailed guides and information based on boulders, grades, and ratings, all segmented by specific zones within Sunset Forest.</p>
                <p>Through our platform, you can enjoy minimal data usage and swift browsing speed, making it easy for you to get the latest updates and plan your climbing or bouldering adventure effortlessly. Even in areas with poor signal or when you're running low on data, we've designed our online guidebook to be easily accessible, anytime, anywhere.</p>
                <p>Currently, our focus is solely on providing the most accurate, up-to-date information for the Sunset Forest bouldering site. We are committed to making your experience in Sunset Forest as enjoyable and fulfilling as possible, helping you discover the joy of bouldering and climbing in this remarkable location.</p>
                <p>While Sunset Forest is our current area of focus, we are continually looking to expand and improve. We're excited to share that we have new features in the pipeline, designed to enhance your bouldering and climbing experience even further. Stay tuned for updates coming soon!</p>
                <p>Join us at CRAGS.HK, your trusted companion in the world of bouldering and climbing, as we guide you through the wonders of Sunset Forest.</p>
                <h3><a href="https://maps.app.goo.gl/imrdXQzcdumx23VM6" target="_blank" title="Access & Location in Google Map | Complete Guide to Bouldering and Climbing in Sunset Forest | CRAGS.HK">Access</a></h3>
                <p>We already created a Google marker of Sunset Forest, please click <a href="https://maps.app.goo.gl/imrdXQzcdumx23VM6" target="_blank" title="Access & Location in Google Map | Complete Guide to Bouldering and Climbing in Sunset Forest | CRAGS.HK">here</a> to check the location</p>
            </div>
        </main>
    )
}
