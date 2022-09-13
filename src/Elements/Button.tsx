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
    background-color: white;
    transition: all 0.6s;
    outline: none;
    border: 0px solid transparent;
    font-size: 1rem;
    padding: 8px 20px;
    cursor: pointer;

    font-family: "Hack";
    src: local("Hack"),
        url("./../Hack_Font_Family_(Fontmirror)/Hack Regular 400.ttf"),
        format("truetype");
    font-weight: regular;
`;

const Stick = styled.span`
    width: ${(props: { isHovered: boolean; isSelected: boolean }) =>
        props.isHovered ? "40px" : props.isSelected ? "3px" : "0px"};
    background-color: ${(props: { isHovered: boolean }) =>
        props.isHovered ? "rgba(51, 255, 51, 1)" : "rgba(51, 255, 51, 0)"};
    transition: all 0.2s;
    height: 3px;
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
            >
                {children}
            </BTN>
            <Stick isSelected={isSelected} isHovered={hovered} />
        </Container>
    );
};

export default Button;
