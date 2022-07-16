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
    .then(() => alert('保存しました'))
    .catch(() => alert('保存に失敗しました'))
})
document.getElementById('auto-id').addEventListener('click', () => {
  const id = document.getElementById('user-id').value
  document.getElementById('user-name').value = "s" + id.substring(5, 12)
})
