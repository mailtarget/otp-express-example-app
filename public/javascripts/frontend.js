function getStatus () {
  fetch('/users/status/' + token)
  .then(result => {
    return Promise.all([result.json(), result.status])
    
  })
  .then(result => {
    console.log('fe', result)
    const [data, status] = result
    if (status === 200) {
      localStorage.token = data.token
      console.log('redirect to dashboard')
      // window.location.href = '/dashboard'
    } else if (status === 401 && data.code === 'verifyException') {
      // retry
      setTimeout(() => {
        getStatus()
      }, 5000)
    } else if (status === 401 && data.code === 'tokenException') {
      console.log('redirect to expired token')
      // window.location.href = '/expired'
    }
  })
}

function getData () {
  const token = localStorage.getItem('token')
  return fetch('/dash', {
    headers: {
      'authorization': token
    }
  })
    .then(result  => {
      if (result.status !== 200) return Promise.reject('failed')
      return Promise.all([result.json(), result.status])
    })
    .then(result => {
      return result
    })
    .catch(err => {
      return Promise.reject(err)
    })
}