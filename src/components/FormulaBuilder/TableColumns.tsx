import React, { useContext } from 'react';
import { ColumnNameButton, SubContainer } from './FormulaBuilder.styles';
import { ColumnsContext } from '../../context/ColumnsContext';

type TableColumnsProps = {
  addToFormula: (eventProps: React.MouseEvent<HTMLElement>) => void;
};

export const TableColumns: React.FC<TableColumnsProps> = ({ addToFormula }) => {
  const { columns } = useContext(ColumnsContext);

  return (
    <SubContainer>
      <h3>Table Columns</h3>
      {columns.map(({ columnName }, index) => (
        <ColumnNameButton key={index} onClick={addToFormula} outlined={true}>
          {columnName}
        </ColumnNameButton>
      ))}
    </SubContainer>
  );
};
