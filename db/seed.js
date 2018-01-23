const request = require('superagent')
const user = require('./fixtures/user.json')
const classes = require('./fixtures/classes.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}


request
  .post(createUrl('/users'))
  .send(user)
  .then((res) => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })

  const authenticate = (email, password) => {
    request
      .post(createUrl('/sessions'))
      .send({ email, password })
      .then((res) => {
        console.log('Authenticated!')
        return createClasses(res.body.token)
      })
      .catch((err) => {
        console.error('Failed to authenticate!', err.message)
      })
  }

  const createClasses = (token) => {
    return classes.map((schoolClass) => {
      return request
        .post(createUrl('/classes'))
        .set('Authorization', `Bearer ${token}`)
        .send(schoolClass)
        .then((res) => {
          console.log('schoolClass seeded...', res.body.title)
        })
        .catch((err) => {
          console.error('Error seeding schoolClass!', err)
        })
    })
  }
