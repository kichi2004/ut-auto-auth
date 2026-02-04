const QUERIES = {
  'idp.account.tsukuba.ac.jp': {
    'username': '#username',
    'password': '#password',
    'save': 'button[name="_eventId_proceed"]',
    'error': '.form-error'
  },
  'twins.tsukuba.ac.jp': {
    'username': '#userNameInput',
    'password': '#passwordInput',
    'save': 'button[type="submit"]',
    'error': null
  },
  'idp.coins.tsukuba.ac.jp': {
    'username': '#username',
    'password': '#password',
    'save': 'button[name="_eventId_proceed"]',
    'error': '.form-error'
  },
  'papercut-p01.u.tsukuba.ac.jp': {
    'username': '#inputUsername',
    'password': '#inputPassword',
    'save': 'input.loginSubmit',
    'error': '#login-feedback-message > div.errorMessage',
  }
}
const ONLY_UTID_NAME = [
  "idp.coins.tsukuba.ac.jp",
  "papercut-p01.u.tsukuba.ac.jp"
]

function autoInput() {
  if (location.search.includes('execution=e3')) {
    console.warn("Session Error")
    return
  }
  if (!QUERIES[location.hostname]) {
    console.warn(`No Queries ("${location.hostname}")`)
    return
  }
  const { username, password, save, error } = QUERIES[location.hostname]
  if (error && document.querySelectorAll(error).length > 0) {
    console.log('Error written')
    return
  }
  chrome.storage.sync.get(['id', 'name', 'password'], (items) => {
    const userName =  items[ONLY_UTID_NAME.includes(location.hostname) ? 'name' : 'id']
    if (!userName || !password) return
    document.querySelector(username).value = userName
    document.querySelector(password).value = items['password']
    document.querySelector(save).click()
  })
}

window.onload = () => {
  autoInput()
}
