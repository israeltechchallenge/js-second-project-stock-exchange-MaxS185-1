function loaderDisplay() {
    let loader = document.getElementById('loader');
    loader.classList.remove('display-none')
}

function loaderRemove() {
    let loader = document.getElementById('loader');
    loader.classList.add('display-none')
}

const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ`;
const container = document.createElement('div');
const searchClickBtn = document.querySelector('#search-button');
const searchingBoxValue = document.querySelector('#box-digit');

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
                    stockCompanyData = (`${stock.name} (${stock.symbol})`);
                    console.log(stockCompanyData);
                    let listOfStocks = document.querySelector("#list-of-stocks");
                    let stockLinesResults = document.createElement('p');
                    stockLinesResults.textContent = stockCompanyData;
                    listOfStocks.appendChild(stockLinesResults);
                    loaderRemove()
                }
            }
        )
}



searchClickBtn.addEventListener("click", stocksList);

