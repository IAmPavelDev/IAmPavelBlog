import React from "react";
import styled, { keyframes } from "styled-components";

const Animation = keyframes`
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
`;
const SpanAni = keyframes`
    from {
        background-color: red;
    }
    to{
        background-color: orange;
    }
`;
const SpanAni2 = keyframes`
    from {
        background-color: green;
    }
    to{
        background-color: blue;
    }
`;
const SpanAni3 = keyframes`
    from {
        background-color: blue;
    }
    to{
        background-color: green;
    }
`;
const SpanAni4 = keyframes`
    from {
        background-color: orange;
    }
    to{
        background-color: red;
    }
`;
const Container = styled.div`
  width: 3rem;
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  animation: ${Animation} 2s linear infinite;
  justify-items: center;
  align-items: center;
  span {
    display: block;
    background-color: red;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    animation: ${SpanAni} 2s linear infinite;
  }
  span:nth-child(2) {
    background-color: green;
    animation: ${SpanAni2} 2s linear infinite;
  }
  span:nth-child(3) {
    background-color: blue;
    animation: ${SpanAni3} 2s linear infinite;
  }
  span:nth-child(4) {
    background-color: orange;
    animation: ${SpanAni4} 2s linear infinite;
  }
`;

export default function LoadingAni() {
  return (
    <Container>
      <span className="sphere_1"></span>
      <span className="sphere_2"></span>
      <span className="sphere_3"></span>
      <span className="sphere_4"></span>
    </Container>
  );
}
