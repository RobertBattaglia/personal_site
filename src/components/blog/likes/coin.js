import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

import coin from 'assets/images/svgs/coin.svg'
import coinRed from 'assets/images/svgs/coinRed.svg'

const spin3dAndGoUp = keyframes`
  0% {
    transform: translate(-50%, -15px) rotateY(0);
    opacity: 1;
  }
  25% {
    transform: translate(-50%, -30px) rotateY(90deg);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -45px) rotateY(180deg);
    opacity: 1;
  }
  75% {
    transform: translate(-50%, -60px) rotateY(270deg);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -75px) rotateY(360deg);
    opacity: 0;
  }
`
const COIN = styled(coin)`
  width: 25px;
  animation-name: ${spin3dAndGoUp};
  animation-duration: 1250ms;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -15px) rotateY(0deg);
  opacity: 0;
`
const COINRED = styled(coinRed)`
  width: 25px;
  animation-name: ${spin3dAndGoUp};
  animation-duration: 1250ms;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -15px) rotateY(0deg);
  opacity: 0;
`

const Coin = (props) => props.red ? <COINRED {...props} /> : <COIN {...props} />

export default Coin
