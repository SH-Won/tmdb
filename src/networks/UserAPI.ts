import {
  AuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
  GithubAuthProvider,
} from 'firebase/auth'
import FetchAPI from './FetchAPI'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export default class UserAPI extends FetchAPI {
  constructor() {
    super()
  }
  getProvider = (providerName: string) => {
    switch (providerName) {
      case 'google':
        return new GoogleAuthProvider()
      case 'github':
        return new GithubAuthProvider()
    }
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }
  login = async (providerName: string) => {
    //
    const auth = getAuth()
    const provider = this.getProvider(providerName) as AuthProvider
    const result = await setPersistence(auth, browserSessionPersistence).then(async () => {
      return await signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(result.user)
        console.log(credential)
        return { token, credential, user }
      })

      //signInWithRedirect
    })
    return result
  }
  getUser = () => {
    const auth = getAuth()
    const user = auth.currentUser
    return user ? user : undefined
  }
  logout = async () => {
    const auth = getAuth()
    const result = await auth.signOut().then((result) => result)
    return result
  }
}
