import styles from '@/app/page.module.scss'

export default function Guide360() {
    return (
        <main className={styles.main}>
            <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
            <a-scene>
                <a-sky src="/360.JPG" rotation="0 90 0"></a-sky>
            </a-scene>
        </main>
    )
}
