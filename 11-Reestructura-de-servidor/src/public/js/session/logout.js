(() => {
  const $ = (item) => document.querySelector(`${item}`)
  const form = $('#form-logout')
  const user = $('#user')

  fetch('http://localhost:8080/api/session/current')
    .then(data => data.json())
    .then(data => { user.innerText = `${data.payload.fullname}` })

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()

      fetch('http://localhost:8080/api/session/logout', {
        method: 'DELETE'
      })
        .then(data => { if (data.status === 204) window.location = '/signin' })
    })
  }
})()
