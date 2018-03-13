import { postRequest, createMutation } from './index'

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
  }
}
