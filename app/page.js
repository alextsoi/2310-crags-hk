import Image from 'next/image'
import styles from './page.module.css'
import routes from './data/routes.json'
import blocs from './data/blocs.json'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Problems</h1>
      {blocs.data.map((bloc) => {
        return <h2>{bloc.id} - {bloc.name}</h2>;
      })}
    </main>
  )
}
