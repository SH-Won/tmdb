import { useMemo, useState } from 'react'
import './InputBox.scss'
interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchText: string
  screen?: 'desktop' | 'tablet' | 'mobile' | ''
  children?: JSX.Element | JSX.Element[] | string
  placeholder?: string
}
const InputBox = (props: SearchInputProps) => {
  const [focus, setFocus] = useState(false)
  const computedClass = useMemo(() => {
    let className = ''
    if (focus || props.searchText) {
      className += ' focus'
    }
    if (props.screen === 'mobile') {
      className += ' mobile'
    }
    return className
  }, [focus, props.screen])
  return (
    <div className={'input-wrapper' + computedClass}>
      {props.children}
      <input
        type="text"
        className="input-search"
        onChange={props.onChange}
        placeholder={props.placeholder}
        value={props.searchText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default InputBox
