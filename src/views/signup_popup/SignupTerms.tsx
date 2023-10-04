import './Signup.scss'
import { COLLECTION_OF_USER_INFORMATION, TERMS_OF_USE } from '@/const/signup'
import { BasicBottomButtons as BBB } from '@/components/common/BasicBottomButtons'
import { PopupComponentProps } from '@/types/popup/RouterTypes'
import { useState } from 'react'

const SignupTerms = (props: PopupComponentProps) => {
  const [useTermChecked, setUseTermChecked] = useState(false)
  const [collectTermChecked, setCollectTermChecked] = useState(false)

  const isAllChecked = useTermChecked && collectTermChecked

  const changeAllCheck = () => {
    if (!isAllChecked) {
      setUseTermChecked(true)
      setCollectTermChecked(true)
    } else {
      setUseTermChecked(false)
      setCollectTermChecked(false)
    }
  }

  const confirm = () => {
    props.push({
      name: 'SignupUserInfo',
    })
  }
  return (
    <div className="signup-terms">
      <div className="checkbox-wrapper">
        <input
          className="title"
          defaultValue={'전체 동의'}
          id="all-agree"
          type="checkbox"
          checked={isAllChecked}
          onChange={changeAllCheck}
        />
        <label htmlFor="all-agree">전체 동의</label>
      </div>
      <div className="checkbox-wrapper">
        <input
          className="title"
          defaultValue={'이용약관 동의'}
          id="use"
          type="checkbox"
          checked={useTermChecked}
          onChange={() => setUseTermChecked((prev) => !prev)}
        />
        <label htmlFor="use">이용약관 동의</label>
      </div>
      <textarea className="use-term scroll" readOnly defaultValue={TERMS_OF_USE}></textarea>
      <div className="checkbox-wrapper">
        <input
          className="title"
          defaultValue={'개인정보 수집 및 동의'}
          id="collect"
          type="checkbox"
          checked={collectTermChecked}
          onChange={() => setCollectTermChecked((prev) => !prev)}
        />
        <label htmlFor="collect">개인정보 수집 및 동의</label>
      </div>
      <textarea
        className="collect-term scroll"
        readOnly
        defaultValue={COLLECTION_OF_USER_INFORMATION}
      ></textarea>
      <BBB close={props.close} disable={!isAllChecked} confirm={confirm} />
    </div>
  )
}

export default SignupTerms
