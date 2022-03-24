import axios from 'axios';

const ICX_USDT_BINANCE_ENDPOINT = "https://api.binance.com/api/v3/ticker/price?symbol=ICXUSDT"

export const getICXUSDTPriceBinance = async () => {
  const price = await axios.get(ICX_USDT_BINANCE_ENDPOINT).then(response => response.data.price)
  return price
}
