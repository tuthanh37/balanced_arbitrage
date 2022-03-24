import IconService from 'icon-sdk-js';
const HttpProvider = IconService.HttpProvider;
const IconBuilder = IconService.IconBuilder

const BALN_CONTRACT = 'cxf61cd5a45dc9f91c15aa65831a30a90d59a09619'
const DEX_CONTRACT = 'cxa0af3165c08318e988cb30993b3048335b94af6c'
const EXA = 10**18

const iconService = new IconService(new HttpProvider('https://ctz.solidwallet.io/api/v3'));

/**
 * 
 * @param {*} pair (BALN/bnUSD, BALN/sICX, sICX/bnUSD)
 */
const BalancedPairPrice = async (pair) => {
  const getPriceBuilder = new IconBuilder.CallBuilder()
    .from('hx0000000000000000000000000000000000000001')
    .to(DEX_CONTRACT)
    .method('getPriceByName')
    .params({'_name': pair})
    .build()
  const price = await iconService.call(getPriceBuilder).execute()
  return parseInt(price, 16)/EXA
}
// ["sICX/ICX","sICX/bnUSD","BALN/bnUSD","BALN/sICX","IUSDC/bnUSD","OMM/IUSDC","OMM/sICX","OMM/USDS","CFT/sICX","USDS/bnUSD","METX/bnUSD","METX/sICX","METX/IUSDC","METX/USDS","IUSDT/bnUSD","IUSDT/sICX","GBET/bnUSD"]
export const getBALN_BnUSDPrice = ()=>BalancedPairPrice('BALN/bnUSD')
export const getBALN_SICX = ()=>BalancedPairPrice('BALN/sICX')
export const getSICX_BnUSD = ()=>BalancedPairPrice('sICX/bnUSD')
export const getSICX_ICX = ()=>BalancedPairPrice('sICX/ICX')
export const getIUSDC_BNUSD = ()=>BalancedPairPrice('IUSDC/bnUSD')
export const getUSDS_BNUSD = ()=>BalancedPairPrice('USDS/bnUSD')
export const getIUSDT_BNUSD = ()=>BalancedPairPrice('IUSDT/bnUSD')
