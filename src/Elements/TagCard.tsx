import React, { FC } from "react";
import styled from "styled-components";

const BadgeDark = styled.div`
  color: rgb(108, 117, 125);
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.625rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
`;

const BadgeLight = styled.div`
  color: white;
  background-color: rgba(100, 100, 100, 0.35);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 0.625rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  transition: all .3s;
  &:hover {
    background-color: rgba(100, 100, 100, 0.7);
  }
`;

const TagCard: FC<{ type: "dark" | "light"; text: string }> = ({
  type,
  text,
}) => {
  return (
    <>
      {type === "dark" ? (
        <BadgeDark>{text.toUpperCase()}</BadgeDark>
      ) : type === "light" ? (
        <BadgeLight>{text.toUpperCase()}</BadgeLight>
      ) : (
        <>{text.toUpperCase()}</>
      )}
    </>
  );
};

export default TagCard;
