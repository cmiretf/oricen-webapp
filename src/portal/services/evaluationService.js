import { db, storage, auth } from '../firebase'
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

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

  async uploadEvaluationFile(userId, file, metadata = {}) {
    const currentUser = auth.currentUser
    if (!currentUser) throw new Error('User not authenticated')

    const storagePath = `users/${userId}/evaluations/${Date.now()}_${file.name}`
    const storageRef = ref(storage, storagePath)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    const evalData = {
      userId,
      uploaderId: currentUser.uid,
      title: metadata.title || file.name,
      instructions: metadata.instructions || '',
      category: metadata.category || 'general',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      storagePath: snapshot.ref.fullPath,
      downloadURL,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(collection(db, 'evaluations'), evalData)
    return { id: docRef.id, ...evalData }
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

}
