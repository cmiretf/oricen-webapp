import { db, storage, auth } from "../firebase";
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
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const documentService = {
  async uploadDocument(userId, file, metadata = {}) {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const uploaderId = currentUser.uid;

    let isAdminUpload = false;
    if (metadata.uploadedBy === "admin") {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      isAdminUpload = userDoc.exists() && userDoc.data().role === "admin";
    }

    const storageRef = ref(
      storage,
      `users/${uploaderId}/documents/${Date.now()}_${file.name}`
    );
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const docData = {
      userId: isAdminUpload ? userId : currentUser.uid,
      uploaderId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      storagePath: snapshot.ref.fullPath,
      downloadURL,
      status: isAdminUpload ? "approved" : "pending",
      uploadedBy: isAdminUpload ? "admin" : "user",
      category: metadata.category || "general",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "documents"), docData);
    return { id: docRef.id, ...docData };
  },

  async getUserDocuments(userId) {
    try {
      const docsRef = collection(db, "documents");
      const q = query(
        docsRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error("Error in getUserDocuments:", err);
      // Si el error es sobre el índice, lanzarlo para que el usuario lo vea
      if (
        err.code === "failed-precondition" ||
        err.message?.includes("index")
      ) {
        throw new Error(
          "El índice de Firestore aún se está creando. Espera unos minutos y recarga la página."
        );
      }
      throw err;
    }
  },

  async updateDocumentStatus(docId, status) {
    await updateDoc(doc(db, "documents", docId), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  async deleteDocument(docId, storagePath) {
    await deleteDoc(doc(db, "documents", docId));
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  },
};
