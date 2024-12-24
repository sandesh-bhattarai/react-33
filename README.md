# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Step to setup 
- yarn create vite <folder> [--template=react]
- termiinal get inside directory
- yarn create vite . 
- yarn (install all the packages necessary for the react application)
- yarn run dev (package.json > scripts > dev > "vite")

## FE Architecture 
- Whenever there is a change in url => I will load a page component
- within a page component, there might be different sections that will linked in a page component
- for eg. 
- login, registration, forgetpassword, reset password, activation, logout, dashboard access


## Input tag 
- type => text, number, email, url, date, time, radio, checkbox, button, submit, reset, hidden, file, range, tel, password

# Registration route 
- load form page 
- Form should include: 
    - name, email, password, confirm password, gender(radio), role(dropdown), phone, address, image upload(input type="file")
    `<input type="radio" name="gender" value="male" /> Male`
    `<input type="radio" name="gender" value="female" /> Female`
    `<input type="radio" name="gender" value="other" /> Other`

    `<select name="role">`
        `<option value="seller">Seller</option>`
        `<option value="customer">Buyer</option>`
    `</select>`
    

## Remaining 
- API Integration
- State Management tools 
    - Redux
- Socket programming (BE/FE)
- Nextjs with ts 
- Webservices 
- Project

## API CALL 
- XHR Requuest 
- ajax request
- server api call
- fetch / axios 
- APIs are application programming Interface 
- Website, or web application, mobile app(android, ios), desktop(PWA)
- urls / endpoint ===> recive data (API)
- mobile app, browser
- Data 
- REST API -> 5 methods => get, post, put, patch, delete


# Data 
- Personal Information 
- Family tree 
- Background 
- address 


### Public api (CSRF/XSRF protection)
- no control can be called by anyone 
- Firewall 

### Private api (protected Auth Token)
- Login and access

### Cookie and localStorage or sessinStorage
- Cookie 
- client side storage unit
- EU (User Policy)
- Privacy Policy -> mention data collection, what data, usages , field 
- a domain dependent
- per domain max of 50 cookie 
- per cookie 4096 characters (1 byte)
- cookie path, time, domain depenedent 
- when the cookie is mature, cookie will be self delete
- document.cookie="key=value;path=/;expires=dateTimeInISO;";
- read cookie = document.cookie
- cookie self set on every request

## LocalStorage 
- Client Side store 
- max of 5mb data 
- text data only 
- no maturity 
- localStorage global object
- 3 functions 
- `localStroage.setItem('key', 'value')`
- `localStroage.getItem('key')`
- `localStroage.removeItem('key')`
- `localStroage.clear()`    
- sessionStorage

- debounce => api call 

## Client Side global state management 
- Redux -> toolkit / Zustand 
- Context hook 