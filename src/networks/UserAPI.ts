import {
  AuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import FetchAPI from './FetchAPI'
export default class UserAPI extends FetchAPI {
  constructor() {
    super()
  }
  getProvider = (providerName: string) => {
    switch (providerName) {
      case 'google':
        return new GoogleAuthProvider()
    }
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }
  login = async (providerName: string) => {
    //
    const auth = getAuth()
    const provider = this.getProvider(providerName) as AuthProvider
    const result = await signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user

      return { token, credential, user }
    })
    return result
  }
}
