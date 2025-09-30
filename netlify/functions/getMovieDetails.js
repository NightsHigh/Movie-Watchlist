// netlify/functions/getMovieDetails.js
export async function handler(event) {
  try {
    const { imdbID } = event.queryStringParameters || {}
    const apiKey = process.env.MOVIE_APIKEY

    if (!imdbID) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing imdbID parameter" }) }
    }
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing MOVIE_APIKEY" }) }
    }

    const res = await fetch(`https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&plot=full&apikey=${apiKey}`)
    const data = await res.json()

    return { statusCode: 200, body: JSON.stringify(data) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error", details: err.message }) }
  }
}
