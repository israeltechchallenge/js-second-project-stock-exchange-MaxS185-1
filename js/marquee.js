class StockBarData {
    constructor(symbol, price) {
        this.symbol = symbol;
        this.price = price;
    }

};


function barData() {
    let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse/';
    fetch(url)
        .then(resp => {
            return resp.json();
        })
        .then(stockBarData => {
            console.log(stockBarData);
            stockBarData.forEach(stockBarDataAll => {
                const stockInfoPrice = new StockBarData(stockBarDataAll.symbol, stockBarDataAll.price);
                let stockSymbol = stockInfoPrice.symbol;
                let stockPrice = (" $" + stockInfoPrice.price);

                let stockInfoPriceString = (stockSymbol + stockPrice + "--- ");
                let listOfStocks = document.querySelector("#bar-stocks-list2");
                let stockBarLinesResults = document.createElement('p');
                stockBarLinesResults.innerHTML = stockInfoPriceString;
                listOfStocks.appendChild(stockBarLinesResults);
            });
        })

}

barData();


// const barData =  () => {
//     console.log('bar');
//     let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/actives';
//     let responseBarData = await fetch (url);
//     let barApiData = await responseBarData.json();
//     console.log(barApiData);

//     for (stockNameAndPrice of barApiData) {
//         let barList = document.querySelector('#bar-stocks-list2');
//         const div = document.createElement('div');
//         const newParName = document.createElement ('p');
//         const newParPrice = document.createElement ('p');
//         newParPrice.classList.add('color-price-bar');
//         div.innerHTML= (${newParName} + ' $'+ ${newParPrice});
//         newParName.innerHTML = ('stock');
//         newParPrice.innerHTML = ('10.90')
//         console.log(newParName);
//         barList.appendChild(div);
//     }
// }
