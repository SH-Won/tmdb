import { _user } from '@/store/user'
import '@/styles/UserFavoritePage.scss'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { IOutletContext } from 'types/interface'
const UserFavoritePage = () => {
  const { login } = useOutletContext<IOutletContext>()
  const user = useRecoilValue(_user)
  useEffect(() => {
    if (!user) {
      const userConfirmLogin = confirm('로그인이 필요합니다')
      if (userConfirmLogin) login()
    }
  }, [])
  return <div>UserFavoritePage</div>
}

export default UserFavoritePage
