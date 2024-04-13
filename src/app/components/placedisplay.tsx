'use client'

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useState } from "react"
import CheckEmpty from "../../../utils/checkempty"
import Reload from "../../../utils/reload"

export default function PlaceDisplay(props:any) {

  const {place, cards} = props

  return(
    <div className="bg-amber-200 w-11/12 pb-5 px-2 rounded-xl box-pop">
      <h1 className="text-center my-4 text-xl font-bold">{place}</h1>
      <div className="flex flex-col gap-3">
        {cards.cards.map((card:any, index:any) => <CardDisplay card={card} index={index} key={card.id} />)}
      </div>
    </div>
  )
}

function CardDisplay(card:any, index:any) {

  const [newAmount, setNewAmount] = useState('')
  const [update, setUpdate] = useState(false)
  const [remove, setRemove] = useState(false)

  const handleDelete = async () => {
    const docRef = doc(db, 'data', card.card.place)
    await updateDoc(docRef, {
      cards: arrayRemove(card.card)
    })
    alert(`Card has been deleted`)
    await CheckEmpty(card.card.place)
    Reload()
  }

  const amountChange = (event:any) => {
    setNewAmount(event.target.value)
  }

  const switchUpdate = () => {
    setUpdate((prevState) => !prevState)
    setRemove(false)
  }

  const switchRemove = () => {
    setRemove((prevState) => !prevState)
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault()
    setUpdate(false)
    updateDB(card, newAmount)
  }

  const updateDB = async (card:any, newAmount:any) => {
    const docRef = doc(db, 'data', card.card.place)
    await updateDoc(docRef, {
      cards: arrayRemove(card.card)
    })
    await updateDoc(docRef, {
      cards: arrayUnion({id: card.card.id, amount: newAmount, place: card.card.place})
    })
    alert(`Card has been updated`)
    Reload()
  }

  return(
    <>
      <div className="flex justify-center items-center gap-10 text-lg">
        <div className="flex justify-center gap-2 font-semibold">
          <h1>{card.card.id}:</h1>
          <h1>${card.card.amount}</h1>
        </div>
        <div className="flex items-center justify-center gap-4 text-base">
          {!update ? 
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button onClick={switchUpdate} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Update</button>
            {!remove ? <button onClick={switchRemove} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Remove</button> :
            <div className="flex items-center justify-center gap-5">
              <button onClick={handleDelete} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Confirm Removal</button>
              <button onClick={switchRemove} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Cancel</button>
            </div>}
          </div> : 
          <form className="flex flex-wrap items-center justify-center gap-5" onSubmit={handleSubmit}>
            <input name='amount' value={newAmount} onChange={amountChange} className="outline-none rounded-xl w-32 px-4 py-2 shadow-xl focus:ring focus:ring-amber-400 transition duration-300" placeholder="New amount" required />
            <button className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Submit</button>
            <button onClick={switchUpdate} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Cancel</button>
          </form>}
        </div>
      </div>
      <hr className="border-black md:hidden"></hr>
    </>
  )
}