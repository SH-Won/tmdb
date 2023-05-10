import { RouterPushParams } from '@/types/popup/RouterTypes'
import React from 'react'

interface RouterProps {
  close: () => void
  push: (route: RouterPushParams) => void
  userInfo: { [key: string]: string }
}
const SignupResult = (props: RouterProps) => {
  console.log(props.userInfo)
  return <div>SignupResult</div>
}

export default SignupResult
