import UpcommingVideo from './UpcommingVideo'

export default [
  {
    name: 'UpcommingVideo',
    component: () => (props: any) => {
      return <UpcommingVideo {...props} />
    },
    title: '트레일러',
  },
  {
    name: 'temp',
    component: () => (props: any) => {
      return <div {...props}>temp</div>
    },
  },
]
