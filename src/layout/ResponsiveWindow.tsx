import { useBreakPoints } from '@/hooks'
import { isMobile } from '@/networks'
interface ResponsiveWindowProps {
  children: JSX.Element[] | JSX.Element
}

const checkMobile = () => isMobile()
const ResponsiveWindow = ({ children }: ResponsiveWindowProps) => {
  const { breakPointsClass } = useBreakPoints()
  const isMobile = checkMobile() || breakPointsClass === 'mobile'
  return <div className={`main-container ${breakPointsClass}`}>{children}</div>
}

export default ResponsiveWindow
