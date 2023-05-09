import { Button, Colors } from 'my-react-component'
import React, { useEffect, useRef } from 'react'

interface FilterSearchButtonProps {
  show: boolean
  click: () => void
}
const FilterSearchButton = ({ show, click }: FilterSearchButtonProps) => {
  const searchButton = useRef<HTMLDivElement>(null)
  useEffect(() => {
    //
  }, [])
  if (!show) return null
  return (
    <div className="search-btn">
      <Button color={Colors.main} fontColor={Colors.white} width="auto" click={click}>
        검색
      </Button>
    </div>
  )
}

export default FilterSearchButton
