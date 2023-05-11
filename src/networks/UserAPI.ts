import { getAuth, GoogleAuthProvider } from 'firebase/auth'
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
  login = () => {
    //
    const auth = getAuth()
    return auth
  }
}
