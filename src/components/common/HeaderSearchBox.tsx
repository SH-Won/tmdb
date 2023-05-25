import { useBreakPoints, useI18nTypes } from '@/hooks'
import { useSearch } from '@/hooks/useSearch'
import { Button, Colors, Element, InputBox } from 'my-react-component'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderSearchBox {
  isNotDashBoardPage: boolean
}
const HeaderSearchBox = ({ isNotDashBoardPage }: HeaderSearchBox) => {
  const navigate = useNavigate()
  const { breakPointsClass } = useBreakPoints()
  const { t } = useI18nTypes()
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
          <InputBox searchText={searchText} onChange={onChangeText} screen={breakPointsClass} />
          <Button color={Colors.main} fontColor={Colors.white} click={goSearchPage}>
            {t('app.search.button')}
          </Button>
        </div>
      )}
    </>
  )
}

export default HeaderSearchBox
