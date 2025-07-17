import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(-0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1rem;
  left: 1.8rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalProps = {
  children: ReactNode;
};

type WindowProps = {
  children: ReactElement<{ onClose?: () => void }>;
  name: string;
};

type OpenType = {
  children: ReactElement<{ onClick?: MouseEventHandler }>;
  opens: string;
};

type ContextType = {
  openName: string;
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
} | null;

const ModalContext = createContext<ContextType>(null);

function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) throw new Error("Context is null");

  return context;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: OpensWindowName }: OpenType) {
  const { open } = useModalContext();

  return cloneElement(children, { onClick: () => open(OpensWindowName) });
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiOutlineXMark />
        </Button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
