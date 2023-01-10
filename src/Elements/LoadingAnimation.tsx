import React from "react";
import styled, {keyframes} from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`
const WaveLoader = keyframes`
    0% { background-position: 0 45.5%; }
  50% { background-position: 400px 54%; }
  100% { background-position: 800px 45.5%; }
`;


const LogoTitle = styled.div`
  font-size: 120px;
  font-weight: 800;
  -webkit-text-stroke: 1px black;
  font-family: "Noto Sans Javanese",serif;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  background-image: url("/waveImage.png");
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 rgba(255, 255, 255, 0.06);
  animation: ${WaveLoader} 5s infinite ease-in-out;
  background-size: 400px 150px;
  background-repeat: repeat-x;
  opacity: 1;
  user-select: none;
`


const LoadingAnimation = () => {
    return <Wrapper>
        <LogoTitle>IAMPAVELBLOG</LogoTitle>
    </Wrapper>
}

export default LoadingAnimation;