import { postRequest, createMutation, createQuery } from './index'

export const AuthService = {
  signup (data) {
    const mutation = createMutation()
    mutation.addQuery({
      name: 'upsertUser',
      args: {
        name:
          {
            first: data.name.first,
            last: data.name.last
          },
        email: data.email,
        password: data.password
      },
      nodes: {
        id: 'id',
        name: {
          first: 'first',
          last: 'last'
        },
        email: 'email',
        role: 'role',
        isEnabled: 'isEnabled',
        token: 'token'
      }
    })
    return postRequest(mutation.getGraphQLString(), 'upsertUser', false)
  },
  signin (data) {
    const query = createQuery()
    query.addQuery({
      name: 'login',
      args: {
        email: data.email,
        password: data.password
      },
      nodes: {
        id: 'id',
        name: {
          first: 'first',
          last: 'last'
        },
        email: 'email',
        role: 'role',
        isEnabled: 'isEnabled',
        token: 'token'
      }
    })
    return postRequest(query.getGraphQLString(), 'login', false)
  },
  forgetPassword (data) {
    const query = createQuery()
    query.addQuery({
      name: 'forgetPassword',
      args: {
        email: data.email
      },
      nodes: {
        success: 'success'
      }
    })
    return postRequest(query.getGraphQLString(), 'forgetPassword', false)
  },
  myProfile () {
    const query = createQuery()
    query.addQuery({
      name: 'user',
      args: {
        id: 'me'
      },
      nodes: {
        id: 'id',
        name: {
          first: 'first',
          last: 'last'
        },
        email: 'email',
        role: 'role',
        isEnabled: 'isEnabled'
      }
    })
    return postRequest(query.getGraphQLString(), 'user')
  }
}
