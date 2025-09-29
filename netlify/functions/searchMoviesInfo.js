export async function handler(event) {
  const { imdbID } = event.queryStringParameters;

  // Use the hidden API key from Netlify environment variables
  const url = `https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=${process.env.MOVIE_APIKEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
