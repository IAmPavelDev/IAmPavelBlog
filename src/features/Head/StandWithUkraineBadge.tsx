import styled from "styled-components";

const Text = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: min(2rem, 8vw);
  white-space: nowrap;
  background: -webkit-linear-gradient(red 0%, red 50%, black 50%, black 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  user-select: none;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  height: 60px;
  background: linear-gradient(
    to bottom,
    #0057b7 0%,
    #0057b7 50%,
    #ffd700 50%,
    #ffd700 100%
  );
  cursor: pointer;
  opacity: 1;
`;
const StandWithUkr = () => {
  return (
    <a
      target={"_blank"}
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      href="https://ukrainer.net/povernys-zhyvym/"
    >
      <Container>
        <Text>STAND WITH UKRAINE</Text>
      </Container>
    </a>
  );
};

export default StandWithUkr;
