searchingBoxValue = document.querySelector('#box-digit');


container = document.createElement('div');
searchClickBtn = document.querySelector('#search-button');
stockCompanyData = [];

class MainCompanyRender {
    constructor () {
        this.loaderDisplay();
        this.loaderRemove();
        this.stocksList();
        this.highlightBackground(box, search);
        this.dataOfStocks();
        this.historyOfStock();
    }

    loaderDisplay() {
        let loader = document.getElementById('loader');
        loader.classList.remove('display-none')
    }

    loaderRemove() {
        let loader = document.getElementById('loader');
        loader.classList.add('display-none')
    }

//    searchingBoxValue = document.querySelector('#box-digit');


//     container = document.createElement('div');
//     searchClickBtn = document.querySelector('#search-button');
//     stockCompanyData = [];

    async stocksList() {
        console.log(searchingBoxValue.value);
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchingBoxValue.value}&limit=10&exchange=NASDAQ`;
        console.log(url);
    
        loaderDisplay();
    
        fetch(url)
            .then(resp => {
                loaderDisplay();
                return resp.json();
            })
            .then(
    
                async (stocks) => {
                    for (const stock of stocks) {
                        console.log(stock);
                        let stockCompanyName = (`${stock.name}`)
                        let stockCompanySymbol = (`${stock.symbol}`);
                        let symbolLink = await dataOfStocks(stock.symbol);
                        console.log(symbolLink.profile);
                        let stockCompanyImgLink = symbolLink.profile.image;
                        let stockCompanyImg = new Image();
                        stockCompanyImg.src = stockCompanyImgLink;
                        let stockCompanyPercChanges = symbolLink.profile.changesPercentage;
    
    
                        let stockHistory = await historyOfStock(stock.symbol);
                        console.log(stockHistory);
    
                        let stockCompanyData = (stockCompanyImg + stockCompanyName + ' ' + '(' + stockCompanySymbol + ')' + '(' + stockCompanyPercChanges + '%)')
                        console.log(stockCompanyData);
                        let listOfStocks = document.querySelector("#list-of-stocks");
    
                        let stockLinesResults = document.createElement('p');
                        stockLinesResults.innerHTML = stockCompanyData // compareBtn;
                        listOfStocks.appendChild(stockLinesResults);
    
                        //highlight searching value
                        highlightBackground(listOfStocks, searchingBoxValue.value);
                        loaderRemove();
    
                    }
                }
            )
    }

    highlightBackground(box, search) {
        const $box = box;
        const $search = search;
    
        const searchText = search;
        const regex = new RegExp(searchText, 'gi');
    
        let text = $box.innerHTML;
        text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
    
        const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
        $box.innerHTML = newText;
    };

    dataOfStocks = async (symbol) => {
        let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/' + symbol;
        let response = await fetch(url);
        let stocks = await response.json();
        return stocks;
        // console.log(stocks.profile.image);
        // return stocks.profile.image;
    }

    historyOfStock = async (symbol) => {
        let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/' + symbol + '?serietype=line';
        let response = await fetch(url);
        let stocks = await response.json();
        return stocks;
        // console.log(stocks.historical);
    }
}

const renderResults = () => {
    const results = new MainCompanyRender();
    results.addEventListener("click", stocksList)
}

