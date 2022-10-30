import React, { FC, useState } from "react";
import styled from "styled-components";
import "./../Hack_Font_Family_(Fontmirror)/Hack Regular 400.ttf";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
`;

const BTN = styled.button`
  background-color: transparent;
  transition: all 0.6s;
  outline: none;
  border: 0px solid transparent;
  font-size: 1rem;
  padding: 8px 20px;
  cursor: pointer;
  text-decoration: none;
  font-family: "Hack";
  font-size: 0.8rem;
  src: local("Hack"),
    url("./../Hack_Font_Family_(Fontmirror)/Hack Regular 400.ttf"),
    format("truetype");
  font-weight: 600;
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "white" : "rgba(229, 229, 229, 1)"};
  transition: color 0.3s;
  &:hover {
    color: white;
  }
`;

const Stick = styled.span`
  width: ${(props: { isHovered: boolean; isSelected: boolean }) =>
    props.isHovered ? "40px" : props.isSelected ? "25px" : "0px"};
  background-color: #d4a373;
  transition: all 0.2s;
  height: 2px;
  margin: 0 auto;
`;

const Button: FC<{
  children: string;
  isSelected?: boolean;
  disabled?: boolean;
}> = ({ children, isSelected = false, disabled }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Container>
      <BTN
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        isSelected={isSelected}
      >
        {children}
      </BTN>
      <Stick isSelected={isSelected} isHovered={hovered} />
    </Container>
  );
};

export default Button;
