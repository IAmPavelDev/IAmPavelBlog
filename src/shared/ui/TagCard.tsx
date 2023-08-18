import React, { FC, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  white-space: nowrap;
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
  transition: all 0.3s;
  white-space: nowrap;
  &:hover {
    background-color: rgba(100, 100, 100, 0.7);
  }
`;

const TagCard: FC<{
  type: "dark" | "light";
  text: string;
  id: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  doForward?: boolean;
}> = ({ type, text, id, className, onClick, doForward = false }) => {
  const ThemeWrap = type === "dark" ? BadgeDark : BadgeLight;
  const navigate = useNavigate();

  return (
    <div
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClick && onClick(e);
      }}
    >
      {doForward ? (
        <Fragment>
          <Link
            style={{ textDecoration: "none" }}
            to={id ? "/search?tag=" + id : "/search"}
          >
            <ThemeWrap {...{ className }}>
              {text?.toUpperCase() ?? ""}
            </ThemeWrap>
          </Link>
        </Fragment>
      ) : (
        <ThemeWrap {...{ className }}>{text?.toUpperCase() ?? ""}</ThemeWrap>
      )}
    </div>
  );
};

export default TagCard;
