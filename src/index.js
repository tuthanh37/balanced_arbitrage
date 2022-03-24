import { pool } from './utils/PostgresPool'
import PriceCollector from './price_collector/PriceCollector'
import { sendTelegramMsg } from './utils/TelegramBot'
require('dotenv').config()

const priceCollector = new PriceCollector()

// priceCollector.setBnusdThreshold(1.05)

priceCollector.on('data', (data)=>{
  console.log(`ICX_USDT: ${data.ICX_USDT}`)
  console.log(`SICX_BNUSD: ${data.SICX_BNUSD}`)
  console.log(`SICX_ICX: ${data.SICX_ICX}`)
  console.log(`ICX_BNUSD: ${data.ICX_BNUSD}`)
  console.log(`BNUSD_USDT: ${data.BNUSD_USDT}`)
  // console.log(`IUSDC_BNUSD: ${data.IUSDC_BNUSD}`)
  console.log(`USDS_BNUSD: ${data.USDS_BNUSD}`)
  // console.log(`IUSDT_BNUSD: ${data.IUSDT_BNUSD}`)
  console.log(`BNUSD_USDT_PLUS_FEE: ${data.BNUSD_USDT_PLUS_FEE}`)
  console.log('------------------------------')
  pool.query(
  'INSERT INTO price (pair, value) VALUES ($1, $2)', ['ICX_USDT', data.ICX_USDT]
  )
  pool.query(
  'INSERT INTO price (pair, value) VALUES ($1, $2)', ['SICX_BNUSD', data.SICX_BNUSD]
  )
  pool.query(
  'INSERT INTO price (pair, value) VALUES ($1, $2)', ['SICX_ICX', data.SICX_ICX]
  )
  pool.query(
  'INSERT INTO price (pair, value) VALUES ($1, $2)', ['BNUSD_USDT_PLUS_FEE', data.BNUSD_USDT_PLUS_FEE] 
  )
  pool.query(
    'INSERT INTO price (pair, value) VALUES ($1, $2)', ['USDS_BNUSD', data.USDS_BNUSD] 
  )
  // pool.query(
  //   'INSERT INTO price (pair, value) VALUES ($1, $2)', ['IUSDC_BNUSD', data.IUSDC_BNUSD] 
  // )
  // pool.query(
  //   'INSERT INTO price (pair, value) VALUES ($1, $2)', ['IUSDT_BNUSD', data.IUSDT_BNUSD] 
  // )
})

priceCollector.on('sellBnusdAlarm', (price)=>{
  sendTelegramMsg(`Time to sell BNUSD, premium price now is ${price}`)
})

priceCollector.startCollecting(10000)
