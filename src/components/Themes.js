import Cookies from 'universal-cookie';
//import CryptoJS from 'crypto-js';

export default function GetTheme() {
  const cookies = new Cookies()
  if ("lttrbxd-theme" in cookies.cookies) {
    return cookies.get("lttrbxd-theme")
  }
  else {
    cookies.set("lttrbxd-theme", "light", { path: "/" })
    return "light"
  }
}

export function SetTheme(setTo) {
  const cookies = new Cookies()
  cookies.set("lttrbxd-theme", setTo, { path: "/" })
}

export function ToggleTheme() {
  const cookies = new Cookies()
  if (cookies.get("lttrbxd-theme") === "light") {
    cookies.set("lttrbxd-theme", "dark", { path: "/" })
  }
  else {
    cookies.set("lttrbxd-theme", "light", { path: "/" })
  }
}