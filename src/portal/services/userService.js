import { db } from '../firebase'
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'

export const userService = {
  async getAllUsers() {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async getUserById(uid) {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }
    }
    return null
  },

  async updateUser(uid, data) {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: serverTimestamp()
    })
  },

  async setUserRole(uid, role) {
    await updateDoc(doc(db, 'users', uid), {
      role,
      updatedAt: serverTimestamp()
    })
  },

  async setUserService(uid, serviceType) {
    await updateDoc(doc(db, 'users', uid), {
      serviceType,
      updatedAt: serverTimestamp()
    })
  },

  async getUsersByService(serviceType) {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('serviceType', '==', serviceType))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}
