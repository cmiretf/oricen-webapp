import { db } from '../firebase'
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'

export const evaluationService = {
  async createEvaluation(userId, evaluationData) {
    const docRef = await addDoc(collection(db, 'evaluations'), {
      userId,
      ...evaluationData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: docRef.id, ...evaluationData }
  },

  async getUserEvaluations(userId) {
    const evalsRef = collection(db, 'evaluations')
    const q = query(evalsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async updateEvaluationStatus(evalId, status) {
    await updateDoc(doc(db, 'evaluations', evalId), {
      status,
      updatedAt: serverTimestamp()
    })
  },

  async addAccessKey(userId, keyData) {
    const docRef = await addDoc(collection(db, 'accessKeys'), {
      userId,
      ...keyData,
      used: false,
      createdAt: serverTimestamp()
    })
    return { id: docRef.id, ...keyData }
  },

  async getUserAccessKeys(userId) {
    const keysRef = collection(db, 'accessKeys')
    const q = query(keysRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}
