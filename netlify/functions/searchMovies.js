export async function handler(event) {
  const { title } = event.queryStringParameters;

  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${process.env.MOVIE_APIKEY}`);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
