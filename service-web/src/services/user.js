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
          description: 'description'
        },
        challenge: {
          name: 'name',
          shortDescription: 'shortDescription'
        }
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeStateList')
  }
}
