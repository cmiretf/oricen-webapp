import { ref, onMounted, onUnmounted } from 'vue'
import { auth, db } from '../firebase'
import { 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const user = ref(null)
const userRole = ref(null)
const userProfile = ref(null)
const loading = ref(true)
const error = ref(null)

export function useAuth() {
  let unsubscribe = null

  const initAuth = () => {
    console.log('initAuth called')
    
    // Verificar resultado de redirect en background (no bloquear)
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log('Redirect result received:', result.user.email)
        }
      })
      .catch((err) => {
        console.error('Redirect result error:', err)
        error.value = err.message
      })
    
    unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email || 'no user')
      if (firebaseUser) {
        user.value = firebaseUser
        await loadUserProfile(firebaseUser.uid)
      } else {
        user.value = null
        userRole.value = null
        userProfile.value = null
      }
      loading.value = false
    })
  }

  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        userProfile.value = userDoc.data()
        userRole.value = userDoc.data().role || 'user'
      } else {
        await createUserProfile(uid)
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
      error.value = err.message
    }
  }

  const createUserProfile = async (uid) => {
    const newProfile = {
      uid,
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      role: 'user',
      serviceType: null,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await setDoc(doc(db, 'users', uid), newProfile)
    userProfile.value = newProfile
    userRole.value = 'user'
  }

  const loginWithGoogle = async () => {
    try {
      console.log('Iniciando login con Google usando popup...')
      error.value = null
      loading.value = true
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Login error details:', err)
      loading.value = false
      if (err.code === 'auth/operation-not-allowed') {
        error.value = 'El inicio de sesión con Google no está habilitado en la consola de Firebase (Authentication > Sign-in method).'
      } else if (err.code === 'auth/unauthorized-domain') {
        error.value = 'Este dominio no está autorizado en Firebase (Authentication > Settings > Authorized domains).'
      } else if (err.code === 'auth/popup-blocked') {
        error.value = 'El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para este sitio.'
      } else {
        error.value = `Error: ${err.message}`
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      userRole.value = null
      userProfile.value = null
    } catch (err) {
      console.error('Logout error:', err)
      error.value = err.message
    }
  }

  const isAdmin = () => userRole.value === 'admin'
  const isUser = () => userRole.value === 'user'

  onMounted(() => {
    if (!unsubscribe) {
      initAuth()
    }
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    user,
    userRole,
    userProfile,
    loading,
    error,
    loginWithGoogle,
    logout,
    isAdmin,
    isUser,
    initAuth
  }
}
