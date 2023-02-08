import React, { FC } from "react";
import styled from "styled-components";

const CardBadge = styled.div`
  color: ${(props: { fontColorType: "dark" | "light" }) =>
    props.fontColorType === "dark"
      ? "rgba(108, 117, 125, 1)"
      : "rgba(229, 229, 229, 1)"};
`;

const DateCard: FC<{
  fontColorType: "dark" | "light";
  dateToDisplay?: Date;
}> = ({ fontColorType, dateToDisplay }) => {
  return (
    <CardBadge fontColorType={fontColorType}>
      {dateToDisplay?.toString().slice(0, 10).split("-").reverse().join(".") ??
        "once"}
    </CardBadge>
  );
};

export default DateCard;
