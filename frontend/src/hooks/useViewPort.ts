import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 900

export const useViewPort = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        setSize({ width: window.innerWidth, height: window.innerHeight }),
      )
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return {
    width: size.width,
    height: size.height,
    isMobile: size.width < MOBILE_BREAKPOINT,
  }
}
