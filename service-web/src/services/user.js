import {postRequest, createQuery, createMutation} from './index'

export const UserService = {
  userChallengeStateList (data) {
    const query = createQuery()
    query.addQuery({
      name: 'userChallengeStateList',
      nodes: {
        id: 'id',
        notes: 'notes',
        rating: 'rating',
        status: 'status',
        createdAt: 'createdAt',
        programme: {
          id: 'id',
          name: 'name'
        },
        challenge: {
          id: 'id',
          name: 'name',
          shortDescription: 'shortDescription'
        },
        user: {
          id: 'id',
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
        rating: 'rating',
        status: 'status',
        createdAt: 'createdAt',
        programme: {
          id: 'id',
          name: 'name'
        },
        challenge: {
          id: 'id',
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
          id: 'id',
          createdAt: 'createdAt'
        },
        challengeDate: 'challengeDate'
      }
    })
    return postRequest(query.getGraphQLString(), 'userChallengeState')
  },
  updateUserChallengeById (obj) {
    const query = createMutation()
    query.addQuery({
      name: 'upsertUserChallengeState',
      args: {
        id: obj['id'],
        user: obj['user']['id'],
        programme: obj['programme']['id'],
        challenge: obj['challenge']['id'],
        notes: obj['notes'],
        status: obj['status'],
        rating: obj['rating'] || -1
      },
      nodes: {
        id: 'id',
        notes: 'notes',
        rating: 'rating',
        status: 'status',
        createdAt: 'createdAt',
        programme: {
          id: 'id',
          name: 'name'
        },
        challenge: {
          id: 'id',
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
          id: 'id',
          createdAt: 'createdAt'
        },
        challengeDate: 'challengeDate'
      }
    })
    return postRequest(query.getGraphQLString(), 'upsertUserChallengeState')
  }
}
