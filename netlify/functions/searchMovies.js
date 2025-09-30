// netlify/functions/searchMovies.js
export async function handler(event) {
  try {
    const { title } = event.queryStringParameters || {}
    const apiKey = process.env.MOVIE_APIKEY

    if (!title) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing title parameter" }) }
    }
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing MOVIE_APIKEY" }) }
    }

    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${apiKey}`)
    const data = await res.json()

    return { statusCode: 200, body: JSON.stringify(data) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error", details: err.message }) }
  }
}
