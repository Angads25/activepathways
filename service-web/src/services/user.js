import { postRequest, createQuery } from './index'

export const UserService = {
  userChallengeStateList (data) {
    const query = createQuery()
    query.addQuery({
      name: 'userChallengeStateList',
      nodes: {
        id: 'id',
        notes: 'notes',
        status: 'status',
        createdAt: 'createdAt',
        programme: {
          name: 'name'
        },
        challenge: {
          name: 'name',
          shortDescription: 'shortDescription'
        },
        user: {
          createdAt: 'createdAt'
        }
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeStateList')
  }
}
