import axios from 'axios'

const apiUrl = 'http://localhost:3001'

/* まぁ, 理解するより慣れた方が早い気がします. */
// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.
// You send them to the store using store.dispatch().

// action types
// 公式のより、下記のurlの定義の方が分かりやすかった。
// https://github.com/stowball/dummys-guide-to-redux-and-thunk-react/blob/master/src/actions/items.js
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const IS_FETCHING_POSTS = 'IS_FETCHING_POSTS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

// action creators
const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
})

const fetchPostsFailure = (bool) => ({
  type: FETCH_POSTS_FAILURE,
  fetchPostsFailure: bool
})

const isFetchingPosts = (bool) => ({
  type: IS_FETCHING_POSTS,
  isFetchingPosts: bool
})

// async action creator
export const getPosts = () => {
  return (dispatch) => {
    dispatch(isFetchingPosts(true))
    return axios.get(`${apiUrl}/posts.json`)
      .then((response) => {
        dispatch(isFetchingPosts(false))
        dispatch(fetchPostsSuccess(response.data))
      })
      .catch((error) => {
        dispatch(isFetchingPosts(false))
        dispatch(fetchPostsFailure(true))
      })
  }
}