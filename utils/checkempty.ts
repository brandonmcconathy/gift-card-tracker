import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { db } from '../lib/firebase'

export default async function CheckEmpty(place:any) {
  const docRef = doc(db, 'data', place)
  const docSnap = await getDoc(docRef)
  if (docSnap.data()?.cards.length == 0) {
    await deleteDoc(docRef)
  }
}