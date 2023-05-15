import Login from './Login'

export default [
  {
    name: 'Login',
    title: '로그인',
    component: () => (props: any) => {
      return <Login {...props} />
    },
  },
]
