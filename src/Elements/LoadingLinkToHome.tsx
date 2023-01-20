import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const WrapperEnterAnimation = keyframes`
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: -60px;
  height: calc(100vh + 60px);
  width: 100%;
  background-color: rgba(33, 33, 33, 1);
  z-index: 1;
  opacity: 0;
  animation: ${WrapperEnterAnimation} linear 0.2s;
  animation-fill-mode: both;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12vw;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const LogoAnimationContentDesktop = keyframes`
  to {
    background-color: transparent;
    color: rgba(229, 229, 229, 1);
    font-size: min(2rem, 8vw);
    font-weight: 800;
    letter-spacing: -1px;
    left: 20px;
    transform: none;
    top: 64px;
  }
`;

const LogoAnimationWrapper = keyframes`
  70% {
    background-color: rgba(33, 33, 33, 1);
  }
  100% {
    background-color: transparent;
  }
`;

const WrapperAnimate = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  height: calc(100vh + 60px);
  width: 100%;
  background-color: rgba(33, 33, 33, 1);
  animation: ${LogoAnimationWrapper} linear 1s;
  animation-fill-mode: both;
  z-index: 1;
`;

const ContentAnimate = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12vw;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  text-transform: uppercase;
  white-space: nowrap;
  animation: ${LogoAnimationContentDesktop} ease-in-out 1s;
  animation-fill-mode: both;
`;

const LoadingLinkToHome: FC<{
  className?: string;
  duration?: number;
  delay?: number;
  start: (startCallBack: () => void) => void;
  text: string;
}> = ({ className, duration = 1, delay = 1500, start, text }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [isAnimationStart, setIsAnimationStart] = useState(false);

  useEffect(() => {
    start(() => {
      setTimeout(() => {
        setIsAnimationStart(true);
        setTimeout(() => setIsLoaded(true), 1000);
      }, delay);
    });
  });

  return (
    <>
      {/*{isLoaded ? (*/}
      {/*  // <Link className={className} to="/">*/}
      {/*  //   {text}*/}
      {/*  // </Link>*/}
      {/*) : isAnimationStart ? (*/}
      {/*  <WrapperAnimate>*/}
      {/*    <ContentAnimate>{text}</ContentAnimate>*/}
      {/*  </WrapperAnimate>*/}
      {/*) : (*/}
      {/*  <Wrapper>*/}
      {/*    <Content>{text}</Content>*/}
      {/*  </Wrapper>*/}
      {/*)}*/}
    </>
  );
};

export default LoadingLinkToHome;
