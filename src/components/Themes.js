import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';

export default function GetTheme() {
  const cookies = new Cookies()
  console.log("streak-num" in cookies.cookies)
  if ("theme" in cookies.cookies) {
    return cookies.get("theme")
  }
  else {
    cookies.set("theme", "light", { path: "/" })
    return "light"
  }
}

export function SetTheme(setTo) {
  const cookies = new Cookies()
  cookies.set("theme", setTo, { path: "/" })
}

export function ToggleTheme() {
  const cookies = new Cookies()
  if (cookies.get("theme") == "light") {
    cookies.set("theme", "dark", { path: "/" })
  }
  else {
    cookies.set("theme", "light", { path: "/" })
  }
}