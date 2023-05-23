import { useHelper } from '@/hooks'
import { useEventListener } from '@/hooks/useEventListener'
import { useI18nTypes } from '@/hooks/useI18nTypes'
import { useSearch } from '@/hooks/useSearch'
import { Button, Colors, Element } from 'my-react-component'
import { useCallback } from 'react'
import InputBox from '../search/InputBox'
import './SearchBox.scss'

// mainPage 인 DashBoard.tsx 의 최상단에서 search 를 하는 컴포넌트인데, 컴포넌트 네이밍이 뭔가 이상하지만
// 일단 SearchBox 로 하고 추후에 더좋은 네이밍으로 변경해야 한다.
const SearchBox = () => {
  const { t } = useI18nTypes()
  const { searchText, onChangeText } = useSearch()
  const { goSearchPage } = useHelper()

  useEventListener({
    confirm: useCallback(() => goSearchPage(searchText), [searchText]),
  })
  return (
    <div className="search-box">
      {/* 아래 문구는 고민해서 바꿔야하고 i18n 을 통해 ko,en 관리를 따로 하는 작업을 해야함 현재는
          현재는 임시 문구
      */}
      <h2>{t('app.search.title')}</h2>
      <div className="search-area">
        <InputBox
          searchText={searchText}
          onChange={onChangeText}
          placeholder="영화, TV프로그램 검색.."
        >
          <Element name="Search" size="small" color={Colors.grey_bbb} />
        </InputBox>
        <Button
          fontColor={Colors.white}
          color={Colors.main}
          width="50px"
          click={() => goSearchPage(searchText)}
        >
          {t('app.search.button')}
        </Button>
      </div>
    </div>
  )
}

export default SearchBox
