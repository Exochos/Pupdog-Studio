// pages/games.js
import { connectToDatabase } from "../../app/lib/mongodb"

export async function getServerSideProps() {
  const client = await connectToDatabase()
  const db = client.db("gameData")
  const collection = db.collection("salesData")

  const games = await collection.find({}).limit(10).toArray()

  client.close()

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  }
}

function Games({ games }: { games: any[] }) {
  return (
    <div>
      <h1>Top 10 Games</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.Rank} - {game.Name} - {game.Platform} - {game.Year} - {game.Genre} - {game.Publisher} -{" "}
            {game.Global_Sales}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
