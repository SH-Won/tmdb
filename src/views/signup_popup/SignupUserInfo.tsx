import { BasicBottomButtons as BBB } from '@/components/common/BasicBottomButtons'
import InputBox from '@/components/search/InputBox'
import { useSearch } from '@/hooks'
import { PopupComponentProps } from '@/types/popup/RouterTypes'
import React from 'react'

const emailValidator = (email: string) => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  return email === '' || email.match(regExp) != null
}
const passwordValidator = (password: string) => {
  // const reg = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$'
  // const reg = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/
  // const reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/
  const reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[`~!@$!%*#^?&\\(\\)\\-_=+])(?!.*[^a-zA-z0-9`~!@$!%*#^?&\\(\\)\\-_=+]).{8,16}$/
  return password === '' || reg.test(password)
}
const birthdayValidator = (birthday: string) => {
  // const reg = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/
  const reg = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
  return birthday === '' || reg.test(birthday)
}
const nameValidator = (name: string) => {
  // const reg = /^[가-힣a-zA-Z]+$/
  const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const en = /^[a-zA-Z]*$/
  return name === '' || ko.test(name) || en.test(name)
}
const SignupUserInfo = (props: PopupComponentProps) => {
  const { searchText: name, onChangeText: onChangeName } = useSearch()
  const { searchText: birthday, onChangeText: onChangeBirthDay } = useSearch()
  const { searchText: email, onChangeText: onChangeEmail } = useSearch()
  const { searchText: password, onChangeText: onChangePassword } = useSearch()

  const confirm = () => {
    props.push({
      name: 'SignupResult',
      props: {
        userInfo: {
          name,
          birthday,
          email,
          password,
        },
      },
    })
  }
  return (
    <div className="signup-user-info">
      <div className="user-info-column">
        <span>이름</span>
        <InputBox
          searchText={name}
          onChange={onChangeName}
          validator={nameValidator}
          placeholder="이름을 입력해주세요"
        />
      </div>
      <div className="user-info-column">
        <span>생년월일</span>
        <InputBox
          searchText={birthday}
          onChange={onChangeBirthDay}
          validator={birthdayValidator}
          placeholder="생년월일을 8자리로 입력해주세요"
        />
      </div>
      <div className="user-info-column">
        <span>이메일</span>
        <InputBox
          searchText={email}
          onChange={onChangeEmail}
          validator={emailValidator}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="user-info-column">
        <span>비밀번호</span>
        <InputBox
          searchText={password}
          onChange={onChangePassword}
          type="password"
          validator={passwordValidator}
          placeholder="특수문자를 포함해서 비밀번호를 입력해주세요"
        />
      </div>
      <BBB close={props.close} confirm={confirm} />
    </div>
  )
}

export default React.memo(SignupUserInfo)
