import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onClose?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onClose,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading $as="h3">حذف {resourceName}</Heading>
      <p>
        آیا مطمئن به حذف " {resourceName} " هستید؟ این عمل غیر قابل بازگشت است.
      </p>

      <div>
        <Button $variation="secondary" disabled={disabled} onClick={onClose}>
          لغو
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          حذف
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
