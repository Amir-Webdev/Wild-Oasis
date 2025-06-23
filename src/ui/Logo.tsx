import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const P = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
      <P>پناهگاه بکر</P>
    </StyledLogo>
  );
}

export default Logo;
