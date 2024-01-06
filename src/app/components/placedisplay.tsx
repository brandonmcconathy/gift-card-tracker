'use client'

import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function PlaceDisplay(props:any) {

  const {place, cards} = props

  return(
    <div className="bg-amber-200 w-11/12 pb-5 rounded-xl box-pop">
      <h1 className="text-center my-4 text-xl font-bold">{place}</h1>
      <div className="flex flex-col gap-3">
        {cards.cards.map((card:any, index:any) => <CardDisplay card={card} index={index} key={card.id} />)}
      </div>
    </div>
  )
}

function CardDisplay(card:any, index:any) {

  const [data, setData] = useState([])
  const [update, setUpdate] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const docRef = doc(db, 'data', card.card.place)
    await updateDoc(docRef, {
      cards: arrayRemove(card.card)
    })
    alert(`${card.place} - ${card.id} has been deleted`)
    router.refresh()
  }

  const handleUpdate = () => {
    setUpdate(true)
  }

  // console.log(place)

  // useEffect(() => {
  //   const getDBData = async () => {
  //     const data = await getDoc(doc(db, 'data', place))
  //     console.log(data.data())
  //   }
  //   getDBData()
  // },[])

  return(
    <div className="flex justify-center items-center gap-10 text-lg">
      <div className="flex justify-center gap-2 font-semibold">
        <h1>{card.card.id}:</h1>
        <h1>${card.card.amount}</h1>
      </div>
      <div className="flex gap-4 text-base">
        {!update ? <button onClick={handleUpdate} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Update</button> : 
          <div className="flex gap-5">
            <input className="outline-none rounded-xl w-32 px-4 py-2 shadow-xl focus:ring focus:ring-amber-400 transition duration-300" placeholder="New amount" />
            <button className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Submit</button>
          </div>}
        <button onClick={handleDelete} className="bg-amber-400 px-2 py-1 rounded-xl box-pop font-semibold">Remove</button>
      </div>
    </div>
  )
}