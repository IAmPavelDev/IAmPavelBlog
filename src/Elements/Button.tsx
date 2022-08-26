import styled from "styled-components";
const Button = styled.button`
    background-color: white;
    color: #1bd23d;
    transition: all .3s;
    outline: none;
    border: 3px solid transparent;
    font-size: 1rem;
    padding: 8px 20px;
    cursor: pointer;
    font-family: 'Hack';
    &:hover {
        border-bottom-color: #1bd23d;
        /* transform: scale(1.03); */
        /* font-weight: 900; */
    }
`;

export default Button;
