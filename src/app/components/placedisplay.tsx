export default function PlaceDisplay(props:any) {

  const {place, cards} = props

  return(
    <div>
      <h1>{place}</h1>
      <div>
        {cards.cards.map((card:any) => <CardDisplay card={card} key={card.id} />)}
      </div>
    </div>
  )
}

function CardDisplay(card:any) {

  console.log(card.card)
  return(
    <div>
      <h1>{card.card.id}:</h1>
      <h1>${card.card.amount}</h1>
    </div>
  )
}