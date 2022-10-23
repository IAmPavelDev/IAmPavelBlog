import { FC } from "react";
import styled from "styled-components";
import store from "../state/store";

const TagContainer = styled.div`
    border: 1px solid gray;
    border-radius: 8px;
    padding: 2px 4px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    width: fit-content;
    &:hover {
        border-color: ${(props: { removable?: boolean }) =>
            props.removable ? "red" : "#1bd23d"};
        color: #1bd23d;
    }
`;

const Tag: FC<{ tagData: string; removable?: boolean }> = ({
    tagData,
    removable = false,
}) => {
    return removable ? (
        <div
            onClick={() => {
                store.deleteTagInUse(tagData);
            }}
        >
            <TagContainer removable>#{tagData}</TagContainer>
        </div>
    ) : (
        <TagContainer>#{tagData}</TagContainer>
    );
};

export default Tag;
