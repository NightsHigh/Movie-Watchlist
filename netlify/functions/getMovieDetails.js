export async function handler(event) {
  try {
    const API_KEY = process.env.MOVIE_API_KEY
    const { title } = event.queryStringParameters

    if (!title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing title parameter" }),
      }
    }

    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}`
    )

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    }
  }
}
