import { FC } from "react";

import styled from "styled-components";

const Bg = styled.div`
  background-color: rgba(33, 33, 33, 1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: white;
  font-size: 12vw;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`;

export const LoadingBadgeForGlobalSuspense: FC<{ text: string }> = ({
  text,
}) => {
  return (
    <Bg>
      <Text>{text}</Text>
    </Bg>
  );
};
