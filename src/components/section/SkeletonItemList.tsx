interface SkeletonItemListProps {
  ratio: number
}
const SkeletonItemList = (props: SkeletonItemListProps) => {
  // const wrapper = useRef<HTMLDivElement>(null)
  // const [height, setHeight] = useState()
  // // const computedHeight = useMemo(() => {
  // //   const width = wrapper.current?.clientWidth as number
  // //   if (!width) return '0px'
  // //   console.log(width)
  // //   return width * props.ratio + 'px'
  // // }, [wrapper.current])
  // useLayoutEffect(() => {
  //   const width = wrapper.current?.clientWidth as number
  //   const height = width * props.ratio + 'px'
  //   console.log(height)
  //   setHeight(height)
  // }, [])
  // console.log(wrapper.current)
  // console.log(computedHeight)
  return (
    <div className="item-list loading">
      {Array(10)
        .fill(0)
        .map((value, index) => (
          <div key={value + index}></div>
        ))}
    </div>
  )
}

export default SkeletonItemList
