# Gift Card Tracker

*Built using React.js, Next.js, Firebase, Typescript, and Tailwind CSS.*

[Live Website](https://gift-card-tracker.vercel.app/)

### Front End
- Dynamic list of stores each with their own dynamic list of gift cards.
- New card page where users can add new gift cards to the list.
- Users are able to update the amount of a gift card and delete gift cards.

### Back End
- Users submit place, last 4 digits of card number, and amount which are then stored in Firebase.
- Firebase data is read upon page load to display all places along with their gift cards.
- Each place has its own document in Firebase which contains all of the gift cards for that place.
