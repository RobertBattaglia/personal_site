import React, { useReducer, useEffect } from 'react'
import styled from '@emotion/styled'
import { getCookie, setCookie } from '../../../utils/cookies'
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
      scale: 1
    });
  
  useEffect(() => {
    const slug = window.location.pathname;
    fetch('/api/getLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
    }).then(
      response => response.json()
    ).then(
      totalLikes => dispatch({type: 'setTotalLikes', payload: totalLikes})
    )

    let myLikes = parseInt(getCookie('myLikes'), 10)
    if (isNaN(myLikes)) {
      myLikes = 0
      setCookie('myLikes', myLikes, slug)
    }
    dispatch({type: 'setMyLikes', payload: myLikes})

    let fill = getCookie('fill')
    if (!fill) {
      fill = 'black'
      setCookie('fill', fill, slug)
    }
    dispatch({type: 'setFill', payload: fill})
    
    let scale = parseFloat(getCookie('scale'))
    if (isNaN(scale)) {
      scale = 1
      setCookie('scale', scale, slug)
    }
    dispatch({type: 'setScale', payload: scale})
  }, [])

  useEffect(() => {
    const slug = window.location.pathname;
    setCookie(`myLikes`, state.myLikes, slug)
    setCookie(`fill`, state.fill, slug)
    setCookie(`scale`, state.scale, slug)
  }, [state])

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
      <Counter>
        {state.totalLikes}
      </Counter>
    </Container>
  )
}

export default Likes;