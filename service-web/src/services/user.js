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
        challenge: {
          shortDescription: 'shortDescription'
        }
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeStateList')
  }
}
