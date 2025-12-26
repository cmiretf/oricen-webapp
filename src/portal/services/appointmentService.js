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

export const appointmentService = {
  async createAppointment(userId, appointmentData) {
    const docRef = await addDoc(collection(db, 'appointments'), {
      userId,
      ...appointmentData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: docRef.id, ...appointmentData }
  },

  async getUserAppointments(userId) {
    const appointmentsRef = collection(db, 'appointments')
    const q = query(appointmentsRef, where('userId', '==', userId), orderBy('date', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async getAllAppointments() {
    const appointmentsRef = collection(db, 'appointments')
    const q = query(appointmentsRef, orderBy('date', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async updateAppointmentStatus(appointmentId, status) {
    await updateDoc(doc(db, 'appointments', appointmentId), {
      status,
      updatedAt: serverTimestamp()
    })
  },

  async getAvailableSlots(date) {
    const slotsRef = collection(db, 'availableSlots')
    const q = query(slotsRef, where('date', '==', date), where('booked', '==', false))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  async createAvailableSlot(slotData) {
    const docRef = await addDoc(collection(db, 'availableSlots'), {
      ...slotData,
      booked: false,
      createdAt: serverTimestamp()
    })
    return { id: docRef.id, ...slotData }
  }
}
