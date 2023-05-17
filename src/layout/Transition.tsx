import { useEffect, useRef } from 'react'
interface TransitionProps {
  forceRender?: boolean
  className?: string
  children: JSX.Element | JSX.Element[] | string
}
const Transition = (props: TransitionProps) => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries, ob) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = entry.target.classList.contains('disabled') ? '0.5' : '1'
          } else {
            entry.target.style.opacity = '0'
          }
        })
      },
      { threshold: 0 }
    )
    container.current?.childNodes.forEach((element: any) => {
      element.style.opacity = '0'
      element.style.transition = 'opacity 0.3s'
      io.observe(element)
    })
  }, [])
  return (
    <div className={props.className} ref={container}>
      {props.children}
    </div>
  )
}

export default Transition
