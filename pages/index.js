import Lottie from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import rocket from '../animation/rocket.json'

// get max frame from lottie json
const MAX_FRAME = 80

export default function Home() {
  const root = useRef(null)
  const anim = useRef(null)

  useEffect(() => {
    if (root.current) {
      anim.current = Lottie.loadAnimation({
        name: 'rocket',
        container: root.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: rocket
      })
    }

    return () => {
      Lottie.destroy('rocket')
    }
  }, [])

  const onInteract = (action) => () => {
    if (action === 'play') {
      anim.current.play();
    } else if (action === 'pause') {
      anim.current.pause();
    } else if (action === 'stop') {
      anim.current.stop();
    }
  }

  const [speed, _setSpeed] = useState(1)
  const setSpeed = (s) => () => _setSpeed(s)

  useEffect(() => {
    anim.current.setSpeed(speed)
  }, [speed])

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  useEffect(() => {
    const frame = scrollY / 9.9
    const overFrame = Math.floor(frame / 80)
    const loopedFrame = frame - (MAX_FRAME * overFrame);
    console.log({ frame, overFrame, loopedFrame })
    anim.current.goToAndStop(loopedFrame, true)
  }, [scrollY])


  return (
    <div style={{ height: '1000vh' }}>
      <div className={styles.container}>
        <h1>Scroll to Animate</h1>
        <div ref={root} />
        <div className={styles.actionContainer}>
          <button onClick={onInteract('play')}>Start</button>
          <button onClick={onInteract('pause')}>Pause</button>
          <button onClick={onInteract('stop')}>Stop</button>
          <button onClick={setSpeed(speed + 0.5)}>Speed +</button>
          <button onClick={setSpeed(speed - 0.5)}>Speed -</button>
        </div>
      </div>
    </div>
  )
}
