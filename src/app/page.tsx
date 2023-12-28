import PlaceDisplay from "./components/placedisplay";

export default function Home() {

  const data = {name: "Panda"}

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="my-5 text-3xl font-bold">Gift Card Tracker</h1>
      <div>
        <PlaceDisplay data={data} />
      </div>
    </main>
  )
}
