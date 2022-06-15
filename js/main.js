function loaderDisplay() {
    let loader = document.getElementById('loader');
    loader.classList.remove('display-none')
}

function loaderRemove() {
    let loader = document.getElementById('loader');
    loader.classList.add('display-none')
}

let searchingBoxValue = document.querySelector('#box-digit');

const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ`;
const container = document.createElement('div');
const searchClickBtn = document.querySelector('#search-button');
let stockCompanyData = [];
function stocksList() {
    console.log(searchingBoxValue.value);
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchingBoxValue.value}&limit=10&exchange=NASDAQ`;
    console.log(url);

    loaderDisplay();

    fetch(url)
        .then(resp => {
            loaderDisplay();
            console.log(resp);
            return resp.json();
        })
        .then(
            stocks => {
                for (const stock of stocks) {
                    // stockCompanyData = (`${stock.name} (${stock.symbol})`);
                    let stockCompanyName = (`${stock.name}`)
                    let stockCompanySymbol = (`${stock.symbol}`);

                    let symbolLink = dataOfStocks(stock.symbol);
                    console.log(symbolLink);
                    let stockHistory = historyOfStock(stock.symbol);
                    console.log(stockHistory);

                    let stockCompanyData = (stockCompanyName + ' ' + '(' + stockCompanySymbol + ')')
                    console.log(stockCompanyData);
                    let listOfStocks = document.querySelector("#list-of-stocks");
                    let stockLinesResults = document.createElement('p');
                    stockLinesResults.textContent = stockCompanyData;
                    listOfStocks.appendChild(stockLinesResults);
                    loaderRemove();

                }
            }
        )
}


const dataOfStocks = async (symbol) => {
    let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/' + symbol;
    let response = await fetch(url);
    let stocks = await response.json();
    // console.log(stocks.profile.image);
    // return stocks.profile.image;
}

// function dataOfStocks (symbol) {
//     fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
//     .then(resp => {
//         return resp.json();
//     }).then(
//         stocks => {
//             console.log(stocks.profile);
//             return stocks.profile;
//         }

//     )
// }



const historyOfStock = async (symbol) => {
    let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/' + symbol + '?serietype=line';
    let response = await fetch(url);
    let stocks = await response.json();
    // console.log(stocks.historical);
}





// function historyOfStock (symbol) {
//     fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
//     .then(resp => {
//         return resp.json();
//     }).then(
//         stocksHistory => {
//             console.log(stocksHistory);
//         }
//     )
// }


searchClickBtn.addEventListener("click", stocksList);
