let coinName = document.getElementById("coinName")
let time = document.getElementById("time")
let button = document.getElementById("button")
const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbHBhbmFiYW5kYXJhLmluZm9AZ21haWwuY29tIiwiaWF0IjoxNjI0MjExNDA4LCJleHAiOjc5MzE0MTE0MDh9.ZeYhfPHZNV5gTrSQGmLDsidbXRBAQX76EIvdI4zGMIQ"

button.addEventListener("click", ()=>{
  loadCoin()
  document.getElementById("form").insertAdjacentHTML('beforeend', '<p style= "color:#fff; text-align:center; margin-top:20px;">Please Wait While Loading</p>')
})

async function loadCoin() {

  if (coinName.value == '') {
    alert("Please Enter a Coin Name")
    location.reload()

  }

  else {
    const response = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/fibonacciretracement?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const responseTwo = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/breakaway?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const responseThree = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/rsi?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const responseFour = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/supertrend?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const responseFive = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/avgprice?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const responseSix = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/3whitesoldiers?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const macdResponse = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/macd?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
    const emaResponse = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/ema?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}&optInTimePeriod=200`)
    const emaData = await emaResponse.json()
    const macdData = await macdResponse.json()
    const dataSix = await responseSix.json()
    const dataFive = await responseFive.json()
    const dataThree = await responseThree.json()
    const dataFour = await responseFour.json()
    const dataTwo = await responseTwo.json()
    const data = await response.json()

    if (data.errors) {
      alert("Please Enter Valid Coin Name")
      location.reload()
    } else {
      createTable(data, dataTwo, dataThree, dataFour, dataFive, dataSix, macdData, emaData)

    }

  }
  document.getElementById("first").style.display = "none"
  document.getElementById("details-cards").style.display = "block"
}


function createTable(x, b, c, supertrend, price, whiteSoldier, macd, ema) {

  let emaValue
  if(price.value < ema.value){
    emaValue = "Price below 200EMA"
  }else if(price.value > ema.value){
    emaValue = "Price above 200EMA"
  }

  let cross

  if (macd.valueMACD > 0 && macd.valueMACDSignal > 0) {
    if (macd.valueMACD > macd.valueMACDSignal) {
      cross = "Crossed Upwards"
    } else if (macd.valueMACD < macd.valueMACDSignal) {
      cross = "Crossed Downwards"
    }
  } else if (macd.valueMACD < 0 && macd.valueMACDSignal < 0) {
    if (macd.valueMACD < macd.valueMACDSignal) {
      cross = "Crossed Downwards"
    } else if (macd.valueMACD > macd.valueMACDSignal) {
      cross = "Crossed Upwards"
    }
  } else {
    cross = "Neutral"
  }

  let guess

  if (c.value >= 70) {
    guess = "Oversold!"
  } else if (c.value <= 30) {
    guess = "Overbought!"
  } else if(c.value>50 && c.value<56){
    guess = "Possible Downtrend"
  }else if(c.value<50 && c.value>45){
    guess = "Possible Uptrend"
  }else if(c.value<45){
    guess = "Downtrending"
  }else if(c.value>55){
    guess ="uptrending"
  }
  
  
  if (b.value == 0) {
    b.value = `No `
  } else if (b.value == 1) {
    b.value = `Yes`
  }


  let bullOrBear
  if (x.value < price.value) {
    bullOrBear = `<li style = "color:green;"><b>Price is  Above 0.618</b></li>`
  } else {
    bullOrBear = `<li style = "color:red;"><b>Price is  Below 0.618</b></li>`
  }

  document.getElementById("details-cards").innerHTML = `

  <div class="container">
  <div class="card-details">
      <div class="card bg-light mb-3" style="max-width: 380px;">
          <div class="card-header c-header">Technical Details</div>
          <div class="card-body c-body">
              <p><b>Trend :</b> <span style="font-weight: 300;">${x.trend} <span></p>
              <p><b>RSI :</b> <span style="font-weight: 300;">${(c.value).toFixed(2)}</span><span id="rsi"> ${guess} </span></p>
              <p><b>MACD :</b> <span style="font-weight: 300;">${cross} <span></p>
              <p><b>EMA :</b> <span style="font-weight: 300;">${emaValue} <span></p>


          </div>
      </div>

      <div class="card bg-light mb-3" style="max-width: 380px;">
          <div class="card-header c-header">Fib Retracement(0.618)</div>
          <div class="card-body c-body">
              <p><b>Price :</b> <span style="font-weight: 300;">${(x.value).toFixed(3)} <span></p>
              <p><b>Start Price :</b> <span style="font-weight: 300;">${(x.startPrice).toFixed(3)}<span></p>
              <p><b>End Price :</b> <span style="font-weight: 300;">${(x.endPrice).toFixed(3)} <span></p>
              <p>${bullOrBear}</p>

          </div>
      </div>

      <div class="card bg-light mb-3" style="max-width: 380px;">
          <div style="margin-bottom: 20px;" class="card-header c-header">Signal Advice</div>
          <div class="card-body c-body">
              <button class="signal">${supertrend.valueAdvice}</button>
              <p class="stop">Stoploss : ${(supertrend.value).toFixed(3)}</p>
          </div>
      </div>

      <div class="card bg-light mb-3" style="max-width: 380px;">
          <div style="margin-bottom: 40px;" class="card-header c-header">Pivot Points (15m)</div>
          <div class="card-body c-body">
              <button id="pivotButton" class="pivot" style="margin-bottom:20px;">Show Pivot Points</button>
              <ul class="pivotShow" style = "padding-left: 0;">
              
              </ul>  
          </div>
      </div>
  </div>
</div>

<div class="coin">
  <h1>${(coinName.value).toUpperCase()}</h1>
  <h2>${(price.value).toFixed(3)}</h2>
  <p style="cursor:pointer" onClick="location.reload()">Analyze another coin</p>
</div>

    `
  if(guess == "Possible Uptrend"){
    document.getElementById("rsi").style.color = "Green";
  }else if(guess== "Possible Downtrend"){
    document.getElementById("rsi").style.color = "Red";
  }
  let pivotButton = document.getElementById("pivotButton")
  pivotButton.addEventListener("click", loadPivot)
}


async function loadPivot() {
  const responseSeven = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/candle?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=1d&backtrack=1`)
  const dataSeven = await responseSeven.json()
  const priceResponse = await fetch(`https://shrouded-bayou-23618.herokuapp.com/https://api.taapi.io/avgprice?secret=${secret}&exchange=binance&symbol=${coinName.value}/USDT&interval=${time.value}`)
  const price = await priceResponse.json()
  displayCandleDetails(dataSeven, price)

}

function displayCandleDetails(candleprev, cPrice) {

  let pivotShow = document.querySelector(".pivotShow")

  let pp = (candleprev.high + candleprev.low + candleprev.close) / 3
  let r1 = (pp * 2) - candleprev.low
  let s1 = (pp * 2) - candleprev.high
  let r2 = pp + (candleprev.high - candleprev.low)
  let s2 = pp - (candleprev.high - candleprev.low)
  let r3 = pp * 2 + (candleprev.high - 2 * candleprev.low)
  let s3 = pp * 2 - (2 * candleprev.high - candleprev.low)
  let r4 = pp * 3 + (candleprev.high - 3 * candleprev.low)
  let s4 = pp * 3 - (3 * candleprev.high - candleprev.low)

  pivotShow.innerHTML = `
            <li>Resistant 4 : ${r4.toFixed(3)}</li>
            <li>Resistant 3 : ${r3.toFixed(3)}</li>
            <li>Resistant 2 : ${r2.toFixed(3)}</li>
            <li>Resistant 1 : ${r1.toFixed(3)}</li>
            <li><b>Pivot Point : ${pp.toFixed(3)}</b></li>
            <li>Support 1 : ${s1.toFixed(3)}</li>
            <li>Support 2 : ${s2.toFixed(3)}</li>
            <li>Support 3 : ${s3.toFixed(3)}</li>
            <li>Support 4 : ${s4.toFixed(3)}</li>  
   
           `
  let opinion

  if (cPrice.value > pp) {
    opinion = `<b>Current price is above Pivot Point!</b>`
  } else if (cPrice.value < pp) {
    opinion = `<b>Current price is below Pivot Point!</b>`
  } else if (cPrice.value > r1) {
    opinion = `<b>Current price is above Resistance 1!</b>`
  } else if (cPrice.value < s1) {
    opinion = `<b>Current price is below Support 1!</b>`
  }


  pivotShow.insertAdjacentHTML("afterend", opinion)


}



