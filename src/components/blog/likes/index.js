import React, { useReducer, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { mediaQueries } from "../../../constants"
import Thumb from './thumb'

const Container = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Counter = styled('div')`
  width: 100px;
  text-align: center;
  font-size: 18px;
  ${mediaQueries.tablet} {
    width: 200px;
  }
`

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTotalLikes':
      return {...state, totalLikes: action.payload};
    case 'setMyLikes':
      return {...state, myLikes: action.payload};
    case 'setFill':
      return {...state, fill: action.payload};
    case 'setScale':
      return {...state, scale: action.payload};
    case 'increment':
      if (state.myLikes < 10) {
        return ({
          ...state,
          myLikes: state.myLikes + 1,
          totalLikes: state.totalLikes + 1,
          fill: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          scale: state.scale + .05
        })
      }
      return {...state}
    default:
      throw new Error();
  }
}

const Likes = () => {
  const [state, dispatch] = useReducer(
    reducer, {
      totalLikes: 0,
      myLikes: 0,
      fill: 'black',
      scale: 1,
      slug: typeof window === 'undefined' ? '' : window.location.pathname
    }
  );

  const localStorageKey = useCallback((key) => ({
      get: () => localStorage.getItem(`${state.slug}${key}`),
      set: (value) => localStorage.setItem(`${state.slug}${key}`, value)
    }), [state.slug])
  
  useEffect(() => {
    fetch('/api/getLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug: state.slug })
    }).then(
      response => response.json()
    ).then(
      totalLikes => dispatch({type: 'setTotalLikes', payload: totalLikes})
    ).catch(err => {
      console.error(err)
    })

    const persistentMyLikes = localStorageKey('myLikes')
    let myLikes = parseInt(persistentMyLikes.get(), 10)
    if (isNaN(myLikes)) {
      myLikes = 0
      persistentMyLikes.set(myLikes)
    }
    dispatch({type: 'setMyLikes', payload: myLikes})

    const persistentFill = localStorageKey('fill')
    let fill = persistentFill.get()
    if (!fill) {
      fill = 'black'
      persistentFill.set(fill)
    }
    dispatch({type: 'setFill', payload: fill})
    
    const persistentScale = localStorageKey('scale')
    let scale = parseFloat(persistentScale.get())
    if (isNaN(scale)) {
      scale = 1
      persistentScale.set(scale)
    }
    dispatch({type: 'setScale', payload: scale})
  }, [])

  useEffect(() => {
    const persistentMyLikes = localStorageKey('myLikes')
    persistentMyLikes.set(state.myLikes)
    const persistentFill = localStorageKey('fill')
    persistentFill.set(state.fill)
    const persistentScale = localStorageKey('scale')
    persistentScale.set(state.scale)
  }, [state.myLikes, state.fill, state.scale])

  useEffect(() => {
    if (state.totalLikes !== 0) {
      fetch('/api/postLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          slug: window.location.pathname,
          likes: state.totalLikes
        })
      })
    }
  }, [state.totalLikes])

  return (
    <Container>
      <Thumb {...state} dispatch={dispatch} />
      <Counter>{state.totalLikes}</Counter>
    </Container>
  )
}

export default Likes;