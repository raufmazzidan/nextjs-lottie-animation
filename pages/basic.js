import Lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import rocket from '../animation/rocket.json'

export default function Basic() {
  const root = useRef(null)

  useEffect(() => {
    if (root.current) {
      Lottie.loadAnimation({
        name: 'rocket',
        container: root.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: rocket
      })
    }

    return () => {
      Lottie.destroy('rocket')
    }
  }, [])

  return (
    <div className={styles.container}>
      <div ref={root} />
    </div>
  )
}
