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

export const formService = {
  async createForm(formData) {
    const docRef = await addDoc(collection(db, 'forms'), {
      ...formData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: docRef.id, ...formData }
  },

  async getFormsByService(serviceType) {
    const formsRef = collection(db, 'forms')
    const q = query(formsRef, where('serviceType', '==', serviceType))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async getUserFormResponses(userId) {
    const responsesRef = collection(db, 'formResponses')
    const q = query(responsesRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async saveFormResponse(userId, formId, responses) {
    const existingRef = collection(db, 'formResponses')
    const q = query(existingRef, where('userId', '==', userId), where('formId', '==', formId))
    const snapshot = await getDocs(q)
    
    if (snapshot.docs.length > 0) {
      await updateDoc(doc(db, 'formResponses', snapshot.docs[0].id), {
        responses,
        status: 'completed',
        updatedAt: serverTimestamp()
      })
      return { id: snapshot.docs[0].id }
    } else {
      const docRef = await addDoc(collection(db, 'formResponses'), {
        userId,
        formId,
        responses,
        status: 'completed',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { id: docRef.id }
    }
  }
}
