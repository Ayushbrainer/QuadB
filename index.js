const express = require('express');
const axios = require('axios');
const ejs = require('ejs');

const app = express();

app.set("view engine","ejs");

app.use(express.static("public"));

const top10 = ["btcinr",'xrpinr',"ethinr","trxinr","eosinr","batinr","usdtinr","wrxinr","maticinr","bchinr"];
const bitCoinThings = {
  name: [],
  last:[],
  buy:[],
  sell:[],
  volume:[],
  base_unit:[]
}

app.get("/",function(req,res) {

  axios.get('https://api.wazirx.com/api/v2/tickers')
        .then(function(response){
          const bitCoins = response;

          for(var i=0;i<10;i++){
            bitCoinThings.name[i] = (bitCoins.data[top10[i]]['name']);
            bitCoinThings.last[i] = (bitCoins.data[top10[i]]['last']);
            bitCoinThings.buy[i] = (bitCoins.data[top10[i]]['buy']);
            bitCoinThings.volume[i] = (bitCoins.data[top10[i]]['volume']);
            bitCoinThings.base_unit[i] = (bitCoins.data[top10[i]]['base_unit']);
            bitCoinThings.sell[i] = (bitCoins.data[top10[i]]['sell']);
          }
          res.render('index',{stocks:bitCoinThings});
        })
        .catch(function(error){
          console.log(error);
        })

})


app.listen('3000',function() {
  console.log("Server has started");
})
