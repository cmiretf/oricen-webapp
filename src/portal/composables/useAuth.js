import { ref, onMounted, onUnmounted } from 'vue'
import { auth, db } from '../firebase'
import { 
  signInWithPopup, 
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
    unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
      error.value = null
      loading.value = true
      const provider = new GoogleAuthProvider()
      // Forzar selección de cuenta para debug
      provider.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Login error details:', err)
      if (err.code === 'auth/popup-blocked') {
        error.value = 'El navegador bloqueó la ventana emergente. Por favor, permítela e inténtalo de nuevo.'
      } else if (err.code === 'auth/operation-not-allowed') {
        error.value = 'El inicio de sesión con Google no está habilitado en la consola de Firebase.'
      } else if (err.code === 'auth/unauthorized-domain') {
        error.value = 'Este dominio no está autorizado en la consola de Firebase.'
      } else {
        error.value = `Error al iniciar sesión: ${err.message}`
      }
    } finally {
      loading.value = false
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
