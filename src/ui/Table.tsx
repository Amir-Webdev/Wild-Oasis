import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import styled from "styled-components";
import type { CabinType } from "../types/cabin/cabinFromServer";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TablePropTypes = {
  children: ReactNode;
  columns: string;
};

type HeaderPropTypes = {
  children: ReactNode;
};

type RowPropTypes = {
  children: ReactNode;
};

type BodyPropTypes = {
  data?: CabinType[];
  render: (cabin: CabinType) => ReactElement;
};

type TableContextTypes = {
  columns: string;
} | null;

const TableContext = createContext<TableContextTypes>(null);

function Table({ children, columns }: TablePropTypes) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function useTableContext() {
  const context = useContext(TableContext);

  if (!context) throw new Error("TableContext is null");

  return context;
}

function Header({ children }: HeaderPropTypes) {
  const { columns } = useTableContext();

  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }: RowPropTypes) {
  const { columns } = useTableContext();

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }: BodyPropTypes) {
  if (!data || data.length === 0)
    return <Empty>اطلاعاتی برای نمایش در حال حاضر وجود ندارد</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
