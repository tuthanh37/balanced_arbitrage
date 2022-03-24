import { getBALN_BnUSDPrice, getBALN_SICX, getIUSDC_BNUSD, getIUSDT_BNUSD, getSICX_BnUSD, getSICX_ICX, getUSDS_BNUSD } from '../utils/BalancedPairPrice';
import { getICXUSDTPriceBinance } from '../utils/BinancePairPrice';
import EvenEmitter from 'events'

class PriceCollector extends EvenEmitter {

  bnusdThreshold

  constructor() {
    super()
    this.bnusdThreshold = 1.05
  }

  setBnusdThreshold(price) {
    this.bnusdThreshold = price
  }

  startCollecting(interval) {
    setInterval(()=>{
      try{
        Promise.all([getICXUSDTPriceBinance(), getSICX_BnUSD(), getSICX_ICX(), getIUSDC_BNUSD(), getUSDS_BNUSD(), getIUSDT_BNUSD() ]).then(async (result)=>{
          const ICX_USDT = result[0]
          const SICX_BNUSD = result[1]
          const SICX_ICX = result[2]
          const IUSDC_BNUSD = result[3]
          const USDS_BNUSD = result[4]
          const IUSDT_BNUSD = result[5]
        
          const ICX_BNUSD = SICX_BNUSD/SICX_ICX
          const BNUSD_USDT = ICX_USDT / ICX_BNUSD
          const BNUSD_USDT_PLUS_FEE = BNUSD_USDT + 0.016 // When BNUSD_USDT goes low we should sell USDT to BNUSD
          this.emit('data', {
            ICX_USDT: ICX_USDT,
            SICX_BNUSD: SICX_BNUSD,
            SICX_ICX: SICX_ICX,
            ICX_BNUSD: ICX_BNUSD,
            BNUSD_USDT: BNUSD_USDT,
            BNUSD_USDT_PLUS_FEE: BNUSD_USDT_PLUS_FEE,
            IUSDC_BNUSD: IUSDC_BNUSD,
            USDS_BNUSD: USDS_BNUSD,
            IUSDT_BNUSD: IUSDT_BNUSD
          })
          if(BNUSD_USDT_PLUS_FEE > this.bnusdThreshold) {
            this.emit('sellBnusdAlarm', BNUSD_USDT_PLUS_FEE)
          }
        })
      } catch(error) {
        this.emit('error', error)
      }
    }, interval)
  }
}

module.exports = PriceCollector