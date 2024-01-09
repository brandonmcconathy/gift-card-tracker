'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"
import PlaceDisplay from "./components/placedisplay";
import Link from "next/link";

export default function Home() {

  const [places, setPlaces] = useState([])
  const [cards, setCards] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const querySnapshot = await getDocs(collection(db, "data"))
      let tempPlaces: any = []
      let tempCards:any = []
      querySnapshot.forEach((doc) => {
        tempPlaces.push(doc.id)
        tempCards.push(doc.data())
      })
      setPlaces(tempPlaces)
      setCards(tempCards)
    }

    getDBData()
    setLoading(false)
  }, [])

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-white mt-5 mb-10 text-3xl font-bold">Gift Card Tracker</h1>
      <Link href='/add' className="mb-10 py-2 px-3 bg-amber-200 rounded-xl text-lg font-semibold transition duration-500 hover:bg-amber-400">Add New Gift Card</Link>
      {loading ? <h1 className="text-white text-2xl mt-12">loading...</h1> : 
      <div className="w-full flex flex-col justify-center items-center gap-8 mb-16 md:w-3/4 lg:w-1/2">
        {places.map((place, index) => <PlaceDisplay place={place} cards={cards[index]} key={place} />)}
      </div>
      }
    </main>
  )
}
