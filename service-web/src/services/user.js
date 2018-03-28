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
        },
        challengeDate: 'challengeDate'
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeStateList')
  },
  userChallengeById (id) {
    const query = createQuery()
    query.addQuery({
      name: 'userChallengeState',
      args: {
        id: id
      },
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
          shortDescription: 'shortDescription',
          description: 'description',
          highlightedContent: 'highlightedContent',
          illustration: {
            width: 'width',
            height: 'height',
            format: 'format',
            resource_type: 'resource_type',
            url: 'url',
            secure_url: 'secure_url'
          }
        },
        user: {
          createdAt: 'createdAt'
        },
        challengeDate: 'challengeDate'
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeState')
  }
}
