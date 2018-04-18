import {postRequest, createMutation, createQuery} from './index'
import swal from 'sweetalert2'
import resetPassword from "../components/login/resetPassword/resetPassword";

export const AuthService = {
  signup (data) {
    const mutation = createMutation()
    mutation.addQuery({
      name: 'upsertUser',
      args: {
        name: {
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
    return postRequest(mutation.getGraphQLString(), 'upsertUser', false, err => {
      console.log('Intercepting Error', err)
      if (err.search(/already register/i) > -1) {
        swal({
          type: 'warning',
          title: 'Oops!',
          text: 'This email id has been already registered. If you forgot your password then please use forget password link to reset your password.'
        })
      } else {
        swal({type: 'error', title: 'Error', text: err})
      }
    })
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
  resetPassword (data) {
    const query = createQuery()
    query.addQuery({
      name: 'resetPassword',
      args: {
        email: data.password
      },
      nodes:{

      }
    })
    return postRequest(query.getGraphQLString(), 'resetPassword', false)
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
