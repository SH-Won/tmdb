import InputBox from '@/components/search/InputBox'
import { useSearch } from '@/hooks'
import BackEnd from '@/networks'
import { RouterPushParams } from '@/types/popup/RouterTypes'
import { Button, Colors } from 'my-react-component'

interface RouterProps {
  close: () => void
  push: (route: RouterPushParams) => void
}
const emailValidator = (email: string) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return email === '' || email.match(regExp) != null
}
const passwordValidator = (password: string) => {
  const reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[`~!@$!%*#^?&\\(\\)\\-_=+])(?!.*[^a-zA-z0-9`~!@$!%*#^?&\\(\\)\\-_=+]).{8,16}$/
  return password === '' || reg.test(password)
}
const Login = (props: RouterProps) => {
  const { searchText: email, onChangeText: onChangeEmail } = useSearch()
  const { searchText: password, onChangeText: onChangePassword } = useSearch()

  const login = () => {
    const auth = BackEnd.getInstance().user.login()
    console.log(auth)
  }
  return (
    <div className="login">
      <div className="user-info-column">
        <span>이메일</span>
        <InputBox
          searchText={email}
          onChange={onChangeEmail}
          validator={emailValidator}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="user-info-column">
        <span>비밀번호</span>
        <InputBox
          searchText={password}
          onChange={onChangePassword}
          type="password"
          validator={passwordValidator}
          placeholder="특수문자를 포함해서 비밀번호를 입력해주세요"
        />
      </div>
      <Button border={Colors.grey_bbb} color={Colors.white} click={login}>
        google
      </Button>
    </div>
  )
}

export default Login
