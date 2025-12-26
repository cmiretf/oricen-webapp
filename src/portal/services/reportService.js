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

export const reportService = {
  async uploadReport(userId, file, metadata = {}) {
    const currentUser = auth.currentUser
    if (!currentUser) throw new Error('User not authenticated')
    
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
    const isAdmin = userDoc.exists() && userDoc.data().role === 'admin'
    
    if (!isAdmin) throw new Error('Only admins can upload reports')
    
    const uploaderId = currentUser.uid
    const storageRef = ref(storage, `users/${uploaderId}/reports/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    const reportData = {
      userId,
      uploaderId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      storagePath: snapshot.ref.fullPath,
      downloadURL,
      title: metadata.title || file.name,
      description: metadata.description || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    const docRef = await addDoc(collection(db, 'reports'), reportData)
    return { id: docRef.id, ...reportData }
  },

  async getUserReports(userId) {
    const reportsRef = collection(db, 'reports')
    const q = query(reportsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async deleteReport(reportId, storagePath) {
    await deleteDoc(doc(db, 'reports', reportId))
    const storageRef = ref(storage, storagePath)
    await deleteObject(storageRef)
  }
}
