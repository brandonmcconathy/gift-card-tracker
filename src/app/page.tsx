'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"
import PlaceDisplay from "./components/placedisplay";

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

  console.log(places)
  console.log(cards)

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-white mt-5 mb-10 text-3xl font-bold">Gift Card Tracker</h1>
      {loading ? <h1 className="text-white text-2xl mt-12">loading...</h1> : 
      <div className="w-1/2 flex flex-col justify-center items-center gap-8">
        {places.map((place, index) => <PlaceDisplay place={place} cards={cards[index]} key={place} />)}
      </div>
      }
    </main>
  )
}
