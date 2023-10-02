import React from 'react'
import UserProfilePopup from './UserProfilePopup'

export default [
  {
    name: 'UserStatus',
    title: '내 정보',
    component: () => (props: any) => {
      return <UserProfilePopup {...props} />
    },
  },
]
