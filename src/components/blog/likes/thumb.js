import React from 'react'
import svg from 'images/svgs/thumb.svg'
import styled from '@emotion/styled'
import { mediaQueries } from "../../../constants"

const SVG = styled(svg)`
  width: 100px;
  transform: scale(1);
  :hover {
    cursor: pointer;
  }
  ${mediaQueries.tablet} {
    width: 200px;
  }
`

const Thumb = ({ fill, scale, dispatch }) => {

  const handleClick = () => {
    dispatch({type: 'increment'})
  }

  return (
    <SVG
      style={{ fill, transform: `scale(${scale})` }}
      tabIndex={0}
      onClick={handleClick}
    />
  )
}

export default Thumb