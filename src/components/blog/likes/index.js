import React, { useReducer, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { mediaQueries } from '../../../constants'
import debounce from '../../../utils/debounce'
import Thumb from './thumb'
import Counter from './counter'

const Container = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px 0px 15px;
  ${mediaQueries.tablet} {
    padding: 50px 0px 25px;
  }
`

const reducer = (state, action) => {
  switch (action.type) {
    case 'initialize':
      return { ...state, initialized: true}
    case 'setTotalLikes':
      return { ...state, totalLikes: action.payload }
    case 'setMyLikes':
      return { ...state, myLikes: action.payload }
    case 'setFill':
      return { ...state, fill: action.payload }
    case 'increment':
      if (state.myLikes < 10) {
        return ({
          ...state,
          myLikes: state.myLikes + 1,
          totalLikes: state.totalLikes + 1,
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        })
      }
      return { ...state }
    default:
      throw new Error()
  }
}

const Likes = () => {
  const [state, dispatch] = useReducer(
    reducer, {
      initialized: false,
      totalLikes: 0,
      myLikes: 0,
      fill: 'black',
      slug: typeof window === 'undefined' ? '' : window.location.pathname,
    },
  )

  const localStorageKey = useCallback((key) => ({
    get: () => localStorage.getItem(`${state.slug}${key}`),
    set: (value) => localStorage.setItem(`${state.slug}${key}`, value),
  }), [state.slug])

  const postLike = useCallback(
    debounce((likes) => {
      fetch('/api/postLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: window.location.pathname,
          likes
        }),
      }).catch((err) => console.error(err))
    }, 500),
    []
  )

  useEffect(() => {
    fetch('/api/getLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug: state.slug }),
    }).then(
      (response) => response.json(),
    ).then(
      (totalLikes) => {
        dispatch({ type: 'setTotalLikes', payload: totalLikes })
        dispatch({ type: 'initialize' })
      },
    ).catch((err) => {
      console.error(err)
    })

    const persistentMyLikes = localStorageKey('myLikes')
    let myLikes = parseInt(persistentMyLikes.get(), 10)
    if (isNaN(myLikes)) {
      myLikes = 0
      persistentMyLikes.set(myLikes)
    }
    dispatch({ type: 'setMyLikes', payload: myLikes })

    const persistentFill = localStorageKey('fill')
    let fill = persistentFill.get()
    if (!fill) {
      fill = 'black'
      persistentFill.set(fill)
    }
    dispatch({ type: 'setFill', payload: fill })
  }, [])

  useEffect(() => {
    const persistentMyLikes = localStorageKey('myLikes')
    persistentMyLikes.set(state.myLikes)
    const persistentFill = localStorageKey('fill')
    persistentFill.set(state.fill)
  }, [state.myLikes, state.fill, state.slug, localStorageKey])

  useEffect(() => {
    if (state.initialized) {
      postLike(state.totalLikes)
    }
  }, [state.totalLikes])



  return (
    <Container>
      <Thumb {...state} dispatch={dispatch} />
      <Counter {...state} />
    </Container>
  )
}

export default Likes
