const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
// using let because the value will change later when it fetches a quote

// Loading function
function loading() {
    loader.hidden = false;
    // false means dont want it hidden
    // do opposite for quoteContainer
    quoteContainer.hidden = true;
    // when loader is going, we're only gonna see loader and nothing else
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    // want to show container when loading is complete
    loader.hidden = true;
    // hide our loader ^^
}

// Show new quote
function newQuote() {
    loading();
// Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace with 'Uknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

//  Get quotes from API
async function getQuotes() {
    loading();
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

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // back ticks are different than single quotes
    // because we're going to add a query parameter
    window.open(twitterUrl), '_blank';
    // this opens the twitter url to open in a new tab
}


// eventListeners go at the bottom typically
newQuoteBtn.addEventListener('click', newQuote);
// on click we want to load the newQuote function

twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();
