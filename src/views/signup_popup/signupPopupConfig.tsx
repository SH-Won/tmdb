import SignupResult from './SignupResult'
import SignupTerms from './SignupTerms'
import SignupUserInfo from './SignupUserInfo'

export default [
  {
    name: 'Signup',
    title: '이용 약관',
    component: () => (props: any) => {
      return <SignupTerms {...props} />
    },
  },
  {
    name: 'SignupUserInfo',
    title: '회원 정보 입력',
    component: () => (props: any) => {
      return <SignupUserInfo {...props} />
    },
  },
  {
    name: 'SignupResult',
    title: '회원 가입',
    component: () => (props: any) => {
      return <SignupResult {...props} />
    },
  },
]
