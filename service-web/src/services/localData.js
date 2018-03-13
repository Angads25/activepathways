const LS_KEY = {
  authToken: '__user_auth__'
}

const set = {
  authToken: (data) => {
    localStorage.setItem(LS_KEY.authToken, JSON.stringify({
      authToken: data
    }))
  }
}

const fetch = {
  authToken: () => {
    const data = localStorage.getItem(LS_KEY.authToken)
    if (data) {
      try {
        const decoded = JSON.parse(data)
        return decoded.authToken
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const destroy = {
  authToken: () => {
    localStorage.removeItem(LS_KEY.authToken)
  }
}

export const LocalData = {
  set,
  fetch,
  destroy
}
