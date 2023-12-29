'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../lib/firebase"
import PlaceDisplay from "./components/placedisplay";

export default function Home() {

  const [places, setPlaces] = useState([])
  const [data, setData] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const querySnapshot = await getDocs(collection(db, "data"))
      let tempPlaces: any = []
      let tempData:any = []
      querySnapshot.forEach((doc) => {
        tempPlaces.push(doc.id)
        tempData.push(doc.data())
      })
      setPlaces(tempPlaces)
      setData(tempData)
    }

    getDBData()
    setLoading(false)
  }, [])

  console.log(places)
  console.log(data)

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="my-5 text-3xl font-bold">Gift Card Tracker</h1>
      {loading ? <h1>loading...</h1> : 
      <div>
        {places.map((place, index) => <PlaceDisplay place={place} data={data[index]} />)}
      </div>
      }
    </main>
  )
}
