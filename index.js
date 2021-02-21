//https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch')
const { Headers, Request } = require('node-fetch');


//express - same as http
const express = require('express')
//app <- express olio
const app = express()




const url = 'https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20'
let headers = new Headers();
//https://developer.mozilla.org/en-US/docs/Web/API/Headers/set - if header already exists
//https://developer.mozilla.org/en-US/docs/Web/API/Headers/append 
headers.append('Accept-Encoding','deflate');
headers.append('Connection','keep-alive');
headers.append('User-Agent','Script');


//function call to function with fetch 
async function fetchData (req) { 

const response = await fetch(req);
const data = await response.text();

//new line split - saadaan rivit, poistetaan slicella date, close/last, volume, open, high, low
//datassa on viimeinen rivi, mikä on linebreak \n - saattaa tulla esiin undefined
let table = data.split('\n').slice(1)

return table
/*
table.forEach(row => {
    const columns = row.split(',');  
})
*/
}


app.get('/api/table', (request, response) => {

    let req = new Request(url, {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    });


//https://javascript.info/async-await
async function query() {
    const test = await fetchData(req)
    return test
}
//awaitData()

query()
    .then(function (data) {
        let table = data;  
        console.log(table)
        response.send(table)
    });
  })

  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})





