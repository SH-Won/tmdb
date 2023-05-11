import { useMemo, useState } from 'react'
import './InputBox.scss'
interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchText: string
  screen?: 'desktop' | 'tablet' | 'mobile' | ''
  children?: JSX.Element | JSX.Element[] | string
  placeholder?: string
  type?: string
  validator?: (text: string) => boolean
}
const InputBox = (props: SearchInputProps) => {
  const type = props.type ?? 'text'
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

  const computed = useMemo(() => {
    let className = computedClass
    if (typeof props.validator === 'function' && !props.validator?.(props.searchText)) {
      className += ' error'
    }
    return className
  }, [computedClass, props.searchText])

  return (
    <div className={'input-wrapper' + computed}>
      {props.children}
      <input
        type={type}
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
