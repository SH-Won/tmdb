import { useSearch } from '@/hooks/useSearch'
import { Button, Colors, Element } from 'my-react-component'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputBox from '../search/InputBox'

interface HeaderSearchBox {
  isNotDashBoardPage: boolean
}
const HeaderSearchBox = ({ isNotDashBoardPage }: HeaderSearchBox) => {
  const navigate = useNavigate()
  const [openSearchInput, setOpenSearchInput] = useState<boolean>(false)
  const goSearchPage = () => {
    navigate(`/search?language=ko&query=${searchText}`)
    setOpenSearchInput(false)
  }
  const { searchText, onChangeText } = useSearch()

  return (
    <>
      {isNotDashBoardPage && (
        <div className="search" onClick={() => setOpenSearchInput((prev) => !prev)}>
          <Element name="Search" size="big" color={Colors.grey_bbb} />
        </div>
      )}
      {openSearchInput && (
        <div className="app-bar-search">
          <InputBox searchText={searchText} onChange={onChangeText} />
          <Button color={Colors.main} fontColor={Colors.white} click={goSearchPage}>
            검색
          </Button>
        </div>
      )}
    </>
  )
}

export default HeaderSearchBox
