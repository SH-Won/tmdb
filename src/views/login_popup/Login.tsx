import InputBox from '@/components/search/InputBox'
import { useSearch } from '@/hooks'
import BackEnd from '@/networks'
import { toast } from '@/store/toast'
import { user } from '@/store/user'
import { PopupComponentProps } from '@/types/popup/RouterTypes'
import { Button, Colors, Element } from 'my-react-component'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import './LoginPopup.scss'

const emailValidator = (email: string) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return email === '' || email.match(regExp) != null
}
const passwordValidator = (password: string) => {
  const reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[`~!@$!%*#^?&\\(\\)\\-_=+])(?!.*[^a-zA-z0-9`~!@$!%*#^?&\\(\\)\\-_=+]).{8,16}$/
  return password === '' || reg.test(password)
}
const Login = (props: PopupComponentProps) => {
  // const { searchText: email, onChangeText: onChangeEmail } = useSearch()
  // const { searchText: password, onChangeText: onChangePassword } = useSearch()
  const [loginUser, setLoginUser] = useRecoilState(user)
  const toastInatance = useRecoilValue(toast)
  const login = async (providerName: string) => {
    const result = await BackEnd.getInstance().user.login(providerName)
    if (result.user) {
      const { user }: { user: any } = result
      const obj = {
        displayName: user.displayName as string,
        email: user.email as string,
        emailVerified: user.emailVerified as boolean,
        uid: user.uid as string,
        accessToken: user.stsTokenManager.accessToken as string,
        expirationTime: user.stsTokenManager.expirationTime as number,
        refreshToken: user.stsTokenManager.refreshToken as string,
      }
      setLoginUser(obj)
      props.close?.()
      toastInatance.login()
    }
  }
  // useEffect(() => {
  //   if (loginUser) {
  //     props.close?.()
  //   }
  // }, [])

  const loginItems = [
    {
      name: 'Google',
      svgPath: '/google.svg',
      providerName: 'google',
      onClick: (providerName: string) => login(providerName),
    },
    {
      name: 'FaceBook',
      svgPath: '/facebook.svg',
      providerName: 'facebook',
      onClick: () => alert('아직 준비 중입니다'),
    },
    // {
    //   name: 'GitHub',
    //   svgPath: '',
    //   providerName: 'github',
    //   onClick: (providerName: string) => login(providerName),
    // },
  ]
  const RenderLoginItmes = () => {
    return (
      <>
        {loginItems.map((item) => (
          <React.Fragment key={item.name}>
            <Button
              border={Colors.grey_bbb}
              color={Colors.white}
              click={() => item.onClick(item.providerName)}
            >
              <div className="login-item">
                <img src={item.svgPath} />
                <span>{item.name} 로 계속하기</span>
                <Element name="Right" color={Colors.grey_bbb} size="medium" />
              </div>
            </Button>
          </React.Fragment>
        ))}
      </>
    )
  }
  return (
    <div className="login">
      {/* <div className="user-info-column">
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
      </div> */}
      {!loginUser ? <RenderLoginItmes /> : <div>login 성공</div>}
    </div>
  )
}

export default Login
