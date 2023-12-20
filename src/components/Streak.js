import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';

export default function GetStreakNum() {
  //const cookies = new Cookies()
  //return CryptoJS.enc.Utf16.stringify(CryptoJS.enc.Base64.parse(cookies.get("streak-num")))
  return 0;
}

export function UpdateStreakNum(lastDay) {
  const cookies = new Cookies()
  //const currDayNum = CryptoJS.enc.Utf16.stringify(CryptoJS.enc.Base64.parse(cookies.get("lttrbxd-streak-num")))
  const currDayDate = CryptoJS.enc.Utf16.stringify(CryptoJS.enc.Base64.parse(cookies.get("lttrbxd-streak-last-day")))

  const lastDateObj = new Date(currDayDate)
  const currentDateObj = new Date()

  console.log(24 * 60 * 60 * 1000, currentDateObj - lastDateObj)
}