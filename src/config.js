export const config = {


  tjd: {
    uniqueSign:'',
    ownerName:'停简单',
    unlicensedAlertInfo:"请使用微信或支付宝或停简单APP扫码"
  },
  neutral: {
    uniqueSign:'_neutral',
    ownerName:'挺容易',
    unlicensedAlertInfo:"请使用微信或支付宝扫码"
  },

}

export const getConfig = () => config[process.env.NODE_ENV]?config[process.env.NODE_ENV]:config['tjd']
