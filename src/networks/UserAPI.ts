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
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/networks/firebase'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import FetchAPI from './FetchAPI'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export default class UserAPI extends FetchAPI {
  db
  constructor() {
    super()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    this.db = db
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
    try {
      const auth = getAuth()
      const provider = this.getProvider(providerName) as AuthProvider
      const result = await setPersistence(auth, browserSessionPersistence).then(async () => {
        return await signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result.user
          return { token, credential, user }
        })

        //signInWithRedirect
      })

      return result
    } catch (e) {
      throw new Error('app.toast.login_fail')
    }
  }
  getUser = () => {
    const auth = getAuth()
    const user = auth.currentUser
    return user ? user : undefined
  }
  logout = async () => {
    try {
      const auth = getAuth()
      const result = await auth.signOut().then((result) => result)
      return result
    } catch (e) {
      throw new Error('app.toast.logout_fail')
    }
  }
  getUserFavorites = async (uid: string) => {
    const querySnapshot = await getDoc(doc(this.db, 'user', uid))
    return querySnapshot.data()
  }
  createFavorite = async (uid: string, productId: string) => {
    try {
      const userRef = doc(this.db, 'user', uid)
      const response = await setDoc(userRef, {
        favorites: [productId],
      }).then((_) => true)
      return response
    } catch (e) {
      throw new Error('app.toast.try_favorite')
    }
  }
  addFavorite = async (uid: string, productId: string) => {
    const favoriteRef = doc(this.db, 'user', uid)
    try {
      const response = await updateDoc(favoriteRef, {
        favorites: arrayUnion(productId),
      }).then((_) => true)
      return response
    } catch (e) {
      throw new Error('app.toast.try_favorite')
    }
  }
}
