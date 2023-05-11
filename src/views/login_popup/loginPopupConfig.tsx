import Login from './Login'

export default [
  {
    name: 'Login',
    component: (props: any) => () => {
      return <Login {...props} />
    },
  },
]
