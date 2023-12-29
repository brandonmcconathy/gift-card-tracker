export default function PlaceDisplay(props:any) {

  const {place, cards} = props

  return(
    <div className="bg-red-200 w-11/12 pb-5 rounded-xl box-pop">
      <h1 className="text-center my-4 text-xl font-bold">{place}</h1>
      <div className="flex flex-col gap-3">
        {cards.cards.map((card:any) => <CardDisplay card={card} key={card.id} />)}
      </div>
    </div>
  )
}

function CardDisplay(card:any) {
  return(
    <div className="flex justify-center items-center gap-10 text-lg">
      <div className="flex justify-center gap-2 font-semibold">
        <h1>{card.card.id}:</h1>
        <h1>${card.card.amount}</h1>
      </div>
      <div className="flex gap-4 text-base">
        <button className="bg-red-600 px-2 py-1 rounded-xl box-pop font-semibold">Update</button>
        <button className="bg-red-600 px-2 py-1 rounded-xl box-pop font-semibold">Remove</button>
      </div>
    </div>
  )
}