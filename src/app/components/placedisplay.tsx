export default function PlaceDisplay(props:any) {

  const {place, cards} = props

  return(
    <div className="bg-red-200 w-11/12 pb-5 rounded-xl box-pop">
      <h1 className="text-center my-4 text-xl font-semibold">{place}</h1>
      <div className="flex flex-col">
        {cards.cards.map((card:any) => <CardDisplay card={card} key={card.id} />)}
      </div>
    </div>
  )
}

function CardDisplay(card:any) {

  console.log(card.card)
  return(
    <div className="flex justify-center gap-2">
      <h1>{card.card.id}:</h1>
      <h1>${card.card.amount}</h1>
    </div>
  )
}