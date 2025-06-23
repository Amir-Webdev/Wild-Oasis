import styled, { css } from "styled-components";

type FormPropTypes = {
  $type?: "modal";
};

const Form = styled.form<FormPropTypes>`
  ${({ $type }) =>
    $type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${({ $type }) =>
    $type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
