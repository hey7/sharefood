import Cookies from 'js-cookie'

// export function getCookie (name) {
//   return Cookies.get(window.btoa(name))
// }

// export function setCookie (name, token) {
//   return Cookies.set(window.btoa(name), token)
// }

// export function removeCookie (name) {
//   return Cookies.remove(window.btoa(name))
// }

export function getCookie(name) { 
  if(Cookies.get(name)&&name=='user'){
    return JSON.parse(Cookies.get(name)) //因为存的对象
  }
  return Cookies.get(name)
}

export function setCookie(name, token) {
  return Cookies.set(name, token)
}

export function removeCookie(name) {
  return Cookies.remove(name)
}

export function setSession(name, param) {
  sessionStorage.setItem(name, JSON.stringify(param))
}

export function getSession(name) {
  let temp = null
  try {
    temp = JSON.parse(sessionStorage.getItem(name))
  } catch (err) {}
  return temp
}
