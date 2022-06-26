//loader functions
function loaderDisplay() {
    let loader = document.getElementById('loader');
    loader.classList.remove('display-none')
}

function loaderRemove() {
    let loader = document.getElementById('loader');
    loader.classList.add('display-none')
}

let searchingBoxValue = document.querySelector('#box-digit');

// const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ`;

const container = document.createElement('div');
const searchClickBtn = document.querySelector('#search-button');
let stockCompanyData = [];


//companies data fetching and rendering
async function stocksList() {
    console.log(searchingBoxValue.value);
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchingBoxValue.value}&limit=50&exchange=NASDAQ`;
    console.log(url);

    loaderDisplay();

    fetch(url)
        .then(resp => {
            loaderDisplay();
            // console.log(resp);
            return resp.json();
        })
        .then(

            async (stocks) => {
                for (const stock of stocks) {
                    // stockCompanyData = (`${stock.name} (${stock.symbol})`);
                    console.log(stock);
                    // let stockCompanyName = (`${stock.name}`);

                    let symbolLink = await dataOfStocks(stock.symbol);
                    console.log(symbolLink.profile);
                    let stockHistory = await historyOfStock(stock.symbol);

                    console.log(symbolLink.profile.image);

                    let stockCompanyImg = document.createElement('img');
                    stockCompanyImg.src = symbolLink.profile.image;
                    stockCompanyImg.classList.add('img')
                    stockCompanyImg.alt = "logo"

                    let stockCompanyName = document.createElement('div');
                    stockCompanyName.innerText = stock.name;
                    stockCompanyName.classList.add('blue-color')
                    stockCompanyName.classList.add('padding-10')

                    let stockCompanySymbol = document.createElement('div');
                    stockCompanySymbol.innerText = ('(' + stock.symbol + ')');
                    stockCompanySymbol.classList.add('gray-color'); stockCompanySymbol.classList.add('padding-10');

                    let stockCompanyPercChanges = document.createElement('div');
                    stockCompanyPercChanges.innerText = ('$' + symbolLink.profile.changesPercentage);
                    // stockCompanyPercChanges.classList.add('green-color');
                    stockCompanyPercChanges.classList.add('padding-10');
                    console.log(stockCompanyPercChanges);

                    if (symbolLink.profile.changesPercentage > 0) {
                        stockCompanyPercChanges.classList.add('green-color');
                    } else {
                        stockCompanyPercChanges.classList.add('red-color');
                    }

                    let div = document.createElement('div');
                    div.classList.add("flex-row")
                    div.append(stockCompanyImg);
                    div.append(stockCompanyName);
                    div.append(stockCompanySymbol);
                    div.append(stockCompanyPercChanges);
                    let listOfStocks = document.querySelector("#list-of-stocks");
                    // div.classList.add('result-stock')
                    listOfStocks.appendChild(div)




                    // // let stockCompanySymbol = (`${stock.symbol}`);
                    // // let symbolLink = await dataOfStocks(stock.symbol);
                    // // console.log(symbolLink.profile);
                    // let stockCompanyImgLink = symbolLink.profile.image;
                    // // let stockCompanyImg = new Image();
                    // stockCompanyImg.src = stockCompanyImgLink;
                    // // let stockCompanyPercChanges = symbolLink.profile.changesPercentage;


                    // // let stockHistory = await historyOfStock(stock.symbol);
                    // // console.log(stockHistory);

                    // let stockCompanyData = (stockCompanyImg + stockCompanyName + ' ' + '(' + stockCompanySymbol + ')' + '(' + stockCompanyPercChanges + '%)')
                    // // console.log(stockCompanyData);
                    // // let listOfStocks = document.querySelector("#list-of-stocks");
                    // let stockLinesResults = document.createElement('p');

                    // // let compareBtn = document.createElement('button');
                    // stockLinesResults.classList.add('flex-row"')
                    // stockLinesResults.innerHTML = stockCompanyData // compareBtn;

                    //highlight searching value
                    highlightBackground(stockCompanyName, searchingBoxValue.value);
                    highlightBackground(stockCompanySymbol, searchingBoxValue.value);

                    loaderRemove();

                }
            }

            // async (stocks) => {
            //     for (const stock of stocks) {
            //         // stockCompanyData = (`${stock.name} (${stock.symbol})`);
            //         console.log(stock);
            //         let stockCompanyName = (`${stock.name}`)
            //         let stockCompanySymbol = (`${stock.symbol}`);
            //         let symbolLink = await dataOfStocks(stock.symbol);
            //         console.log(symbolLink.profile);
            //         let stockCompanyImgLink = symbolLink.profile.image;
            //         let stockCompanyImg = new Image();
            //         stockCompanyImg.src = stockCompanyImgLink;
            //         let stockCompanyPercChanges = symbolLink.profile.changesPercentage;


            //         let stockHistory = await historyOfStock(stock.symbol);
            //         console.log(stockHistory);

            //         let stockCompanyData = (stockCompanyImg + stockCompanyName + ' ' + '(' + stockCompanySymbol + ')' + '(' + stockCompanyPercChanges + '%)')
            //         console.log(stockCompanyData);
            //         let listOfStocks = document.querySelector("#list-of-stocks");
            //         let stockLinesResults = document.createElement('p');

            //         // let compareBtn = document.createElement('button');
            //         stockLinesResults.classList.add('flex-row"')
            //         stockLinesResults.innerHTML = stockCompanyData // compareBtn;
            //         listOfStocks.appendChild(stockLinesResults);

            //         //highlight searching value
            //         highlightBackground(listOfStocks, searchingBoxValue.value);
            //         loaderRemove();

            //     }
            // }
        )
}


// function highlightBackground1(searched) {
//     // searched.toLowerCase();
//     let text = document.querySelector('.result-stock').innerHTML;
//     let re = new RegExp(searched, "g");
//     let newText = text.replace(re, `<mark>${searched}</mark>`);
//     console.log(newText);
//     document.getElementById("list-of-stocks").innerHTML = newText;
// }

// function highlightBackground2(textToHighlight) {
//     let textToSearch = textToHighlight;
//     let line = document.querySelector('.result-stock');
//     textToSearch = textToSearch.replace((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W));
//     let pattern = new RegExp (`${textToHighlight}`, "gi");
//     line.innerHTML = line.textContent.replace(pattern, match => `<mark>${match}</mark`)
// }

// function highlightBackground3(textToHighlight) {
//     const $box = document.getElementById('box');
//     const $search = document.getElementById('search');
//     const textToSearch = textToHighlight;
//     let line = document.querySelector('.result-stock');
//     line.replace(new RegExp(textToSearch, "gi"), (match) => `<mark>${match}</mark>`)
// }

function highlightBackground(box, search) {
    const $box = box;
    const $search = search;

    const searchText = search;
    const regex = new RegExp(searchText, 'gi');

    let text = $box.innerHTML;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    $box.innerHTML = newText;
};
;

const dataOfStocks = async (symbol) => {
    let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/' + symbol;
    let response = await fetch(url);
    let stocks = await response.json();
    return stocks;
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
    return stocks;
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
