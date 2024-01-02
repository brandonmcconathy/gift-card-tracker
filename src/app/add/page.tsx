'use client'

import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../../lib/firebase"
import Link from "next/link"

export default function Add() {

  const [card, setCard] = useState({place: '', id: '', amount: ''})

  const handleChange = (event:any) => {
    const {name, value} = event.target
    setCard((prevCard) => ({...prevCard, [name]: value}))
  }

  const handleSubmit = (event:any) => {
    event.preventDefault()
    AddDBData(card)
    setCard({place: '', id: '', amount: ''})
    alert('Card Added')
  }

  const AddDBData = async (card:any) => {
    const docRef = doc(db, 'data', card.place)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        cards: arrayUnion({id: card.id, amount: card.amount})
      })
    } else {
      const cards = [{id: card.id, amount: card.amount}]
      await setDoc(doc(db, 'data', card.place), {cards})
    }
  }

return(
  <div className="flex flex-col justify-center items-center mt-6">
    <Link href='/' className="bg-amber-100 py-1 px-3 rounded-xl font-semibold box-pop -mb-2 text-xs transition duration-300 hover:bg-amber-200">Go Back</Link>
    <h1 className="text-white text-center mt-10 mb-10 text-3xl font-bold">Add New Card</h1>
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 text-lg">
      <div className="flex flex-col">
        <label className="text-white">Place:</label>
        <input type="text" name='place' value={card.place} onChange={handleChange} required className="rounded-lg px-2 py-1 box-pop" />
      </div>
      <div className="flex flex-col">
        <label className="text-white">Last 4 of card:</label>
        <input type="text" name='id' value={card.id} onChange={handleChange} required className="rounded-lg px-2 py-1 box-pop" />
      </div>
      <div className="flex flex-col">
        <label className="text-white">Amount:</label>
        <input type="text" name='amount' value={card.amount} onChange={handleChange} required className="rounded-lg px-2 py-1 box-pop" />
      </div>
      <button className="mb-10 py-1 px-2 mt-5 bg-amber-200 rounded-xl text-lg font-semibold transition duration-500 hover:bg-amber-400" >Submit</button>
    </form>
  </div>
)
}