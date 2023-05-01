import UpcommingVideo from './UpcommingVideo'

export default [
  {
    name: 'UpcommingVideo',
    component: () => (props: any) => {
      return <UpcommingVideo {...props} />
    },
    title: 'Trailer',
  },
]
