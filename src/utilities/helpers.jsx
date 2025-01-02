export const showError = (exception, setError) => {
  let errData = exception?.data?.message || null;
  if (errData) {
    Object.keys(errData).map((key) => {
      setError(key, { message: errData[key] });
    });
  }
};

export function setCookie(cname, cvalue, exdays) {
  const d = new Date(); // iso formated date
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie(key) {
  return !!getCookie(key);
}
