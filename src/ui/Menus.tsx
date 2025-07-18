import {
  createContext,
  useContext,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ $position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusPropTypes = {
  children: ReactNode;
};

type TogglePropsTypes = {
  id: number;
};

type ListPropsTypes = {
  id: number;
  children: ReactNode;
};

type ButtonPropTypes = {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

type PositionType = {
  x: number;
  y: number;
} | null;

type openIdType = number | null;

type MenusContextTypes = {
  openId: openIdType;
  open: React.Dispatch<React.SetStateAction<openIdType>>;
  close: () => void;
  position: PositionType;
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
} | null;

const MenusContext = createContext<MenusContextTypes>(null);

function Menus({ children }: MenusPropTypes) {
  const [openId, setOpenId] = useState<openIdType>(null);
  const [position, setPosition] = useState<PositionType>(null);

  const open = setOpenId;
  const close = () => setOpenId(null);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function useMenusContext() {
  const context = useContext(MenusContext);

  if (!context) throw new Error("MenusContext is null");

  return context;
}

function Toggle({ id }: TogglePropsTypes) {
  const { openId, open, close, setPosition } = useMenusContext();

  function handleClick(e: MouseEvent) {
    const button = (e.target as Element)?.closest("button");
    if (!button) return;

    const rect = button.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === null || +openId !== id) open(id);
    else close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiOutlineEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: ListPropsTypes) {
  const { openId, position, close } = useMenusContext();

  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;
  if (!position) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }: ButtonPropTypes) {
  const { close } = useMenusContext();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li style={{ maxHeight: "45px" }}>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        {children}
      </StyledButton>
      ;
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
