

let apiQuotes = [];
// using let because the value will change later when it fetches a quote

// Show new quote
function newQuote() {
// Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}


//  Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
    const response = await fetch(apiUrl);
    // this constant will not be populated until data is fetched from API
    // by default if we did not do async or await it'll set the response value before it gets to fetch
    apiQuotes = await response.json();
    // getting the json from api as a response and turning it into a json object then pass it into global variable called apiQuotes but make it outside the function.
    newQuote();
    } catch {
        // Catch error here
    }
}

// On load
getQuotes();
