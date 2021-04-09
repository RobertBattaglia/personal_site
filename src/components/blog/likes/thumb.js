import React from 'react'
import useSound from 'use-sound'
import svg from 'assets/images/svgs/thumb.svg'
import soundIncrement from 'assets/sounds/increment.wav'
import soundIncrementFinal from 'assets/sounds/incrementFinal.wav'
import styled from '@emotion/styled'
import { mediaQueries } from '../../../constants'

const SVG = styled(svg)`
  width: 100px;
  transition: transform 1s;
  transform: scale(1) rotate(5deg);
  :hover {
    cursor: pointer;
  }
  ${mediaQueries.tablet} {
    width: 200px;
  }
`

const Thumb = ({ myLikes, fill, dispatch }) => {
  const [playIncrement] = useSound(soundIncrement)
  const [playIncrementFinal] = useSound(soundIncrementFinal)

  const handleClick = () => {
    if (myLikes < 8) {
      if (myLikes < 7) {
        playIncrement()
      } else {
        playIncrementFinal()
      }
      dispatch({ type: 'increment' })
    }
  }

  const handleKeyDown = (e) => {
    const ENTER = 13
    const SPACE = 32

    if (e.keyCode === ENTER || e.keyCode === SPACE) {
      e.preventDefault()
      if (myLikes < 8) {
        if (myLikes < 7) {
          playIncrement()
        } else {
          playIncrementFinal()
        }
        dispatch({ type: 'increment' })
      }
    }
  }

  return (
    <SVG
      style={{
        fill,
        transform: `scale(${1 + myLikes * 0.05}) rotate(${myLikes * -0.5}deg)`,
      }}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Thumb
