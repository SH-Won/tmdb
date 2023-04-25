import './GridBox.scss'
interface GridBoxProps {
  children?: string | JSX.Element | JSX.Element[]
  screen?: 'desktop' | 'tablet' | 'mobile' | ''
}
const GridBox = (props: GridBoxProps) => {
  return <div className={`grid-box ${props.screen}`}>{props.children}</div>
}

export default GridBox
