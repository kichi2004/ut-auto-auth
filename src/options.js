// Initialize i18n
function initI18n() {
  // Set page title and lang attribute
  const lang = chrome.i18n.getUILanguage().startsWith('ja') ? 'ja' : 'en'
  document.documentElement.lang = lang
  document.title = chrome.i18n.getMessage('optionsTitle')

  // Replace text content for elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const messageKey = element.getAttribute('data-i18n')
    element.textContent = chrome.i18n.getMessage(messageKey)
  })

  // Replace HTML content for elements with data-i18n-html attribute
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const messageKey = element.getAttribute('data-i18n-html')
    element.innerHTML = chrome.i18n.getMessage(messageKey)
  })
}

// Load saved data
chrome.storage.sync.get(['name', 'id', 'password'],
  ({ name, id, password }) => {
    if (name) document.getElementById('user-name').value = name
    if (id) document.getElementById('user-id').value = id
    if (password) document.getElementById('password').value = password
  })

document.getElementById('save').addEventListener('click', () => {
  console.log('save')
  chrome.storage.sync.set({
    'name': document.getElementById('user-name').value,
    'id': document.getElementById('user-id').value,
    'password': document.getElementById('password').value,
  })
    .then(() => alert(chrome.i18n.getMessage('saveSuccess')))
    .catch(() => alert(chrome.i18n.getMessage('saveFailed')))
})

document.getElementById('auto-id').addEventListener('click', () => {
  const id = document.getElementById('user-id').value
  document.getElementById('user-name').value = "s" + id.substring(5, 12)
})

// Initialize i18n on page load
initI18n()
