import { FC, useContext, useEffect, useState } from 'react';
import { Cell, Column, ColumnHeaderCell2 } from '@blueprintjs/table';
import {
  BinButton,
  ClearButton,
  ResultContainer,
  StyledMenu,
  StyledTable2,
  TableContainer,
} from './OpviaTable.styles';
import { MenuItem, Popover, Position, usePrevious } from '@blueprintjs/core';
import { dummyTableData } from '../../data/dummyData';
import { ColumnsContext, SET_COLUMNS } from '../../context/ColumnsContext';
import {
  convertDataFormat,
  addCalculatedField,
  times,
  formatDateTime,
  getSortedData,
} from '../../utils/formatData';
import { AggregateFunctionType, columns } from '../../utils/constants';
import { showToast } from '../../utils/toast';
import { formulaEvaluationSuccessMessage } from '../../utils/messages';
import {
  applyAggregateFunction,
  applyAggregateFunctionToTimeColumn,
} from '../../utils/aggregateFunctionHelpers';

export const OpviaTable: FC = () => {
  const { columns: allColumns, dispatch } = useContext(ColumnsContext);
  const previousColumnLength = usePrevious(allColumns.length) || 0;

  const [formattedData, setFormattedData] = useState<
    { [key: string]: string }[]
  >([]);
  const [sortedIndexMap, setSortedIndexMap] = useState<number[]>([]);
  const [aggregateFuncResult, setAggregateFuncResult] = useState<string>('');

  // Add the calculated columns to the table
  useEffect(() => {
    const data = convertDataFormat(dummyTableData, columns);

    // Add the calculated columns to the table
    addCalculatedField(data, allColumns);
    setFormattedData(data);
  }, []);

  // Update the table when the column is added or removed
  useEffect(() => {
    const countColumnsChanged = allColumns.length - previousColumnLength;
    if (Math.abs(countColumnsChanged) !== 1) {
      return;
    }

    const updatedData = addCalculatedField([...formattedData], allColumns);

    // When a new column is added, the length of the columns will be increased by 1
    if (countColumnsChanged > 0) {
      if (!updatedData) {
        // Delete the column added
        deleteCalculatedColumn(allColumns[allColumns.length - 1].columnId);
        return;
      } else {
        showToast(formulaEvaluationSuccessMessage, 'success');
      }
    }

    setFormattedData(updatedData || formattedData);
  }, [allColumns.length]);

  const sortDataByColumn = (columnId: string, ascendingOrder = true) => {
    const indexMap = times(formattedData.length, (i: number) => i);

    const sortedData = getSortedData(formattedData, columnId, ascendingOrder);

    setSortedIndexMap(indexMap);
    setFormattedData(sortedData); // Update the state with the sorted data
  };

  const deleteCalculatedColumn = (columnId: string) => {
    const remainingColumns = allColumns.filter(
      (col) => col.columnId !== columnId,
    );
    // Update the context with the new columns
    dispatch({ type: SET_COLUMNS, payload: remainingColumns });
  };

  const renderAggregateFunctionsPopover = (columnId: string) => {
    // Get column's aggregate list by column identifier
    const col = allColumns.find((col) => col.columnId === columnId);
    if (!col) {
      return;
    }

    const { aggregateFunctions, columnType } = col;

    return (
      <Popover
        position={Position.RIGHT_TOP}
        content={
          <StyledMenu>
            {aggregateFunctions.map((func: AggregateFunctionType) => (
              <MenuItem
                text={func}
                icon="publish-function"
                onClick={() => {
                  const result =
                    columnType === 'time'
                      ? applyAggregateFunctionToTimeColumn(
                          formattedData,
                          col,
                          func,
                        )
                      : applyAggregateFunction(formattedData, col, func);
                  const resultStr = `Σ ${func}(${col.columnName}) = ${result}`;
                  setAggregateFuncResult(resultStr);
                }}
                key={func}
              />
            ))}
          </StyledMenu>
        }
      >
        <MenuItem icon="function" text="Functions" />
      </Popover>
    );
  };

  const renderMenu = (columnId: string) => {
    const sortAsc = () => sortDataByColumn(columnId);
    const sortDesc = () => sortDataByColumn(columnId, false);

    return (
      <StyledMenu>
        <MenuItem
          icon="sort-asc"
          text="Sort Asc"
          key="sortAsc"
          onClick={sortAsc}
        />
        <MenuItem
          icon="sort-desc"
          text="Sort Desc"
          key="sortDesc"
          onClick={sortDesc}
        />
        {renderAggregateFunctionsPopover(columnId)}
      </StyledMenu>
    );
  };

  const headerCellRenderer = (columnIndex: number) => {
    const { columnName, columnId, formula } = allColumns[columnIndex];

    return (
      <ColumnHeaderCell2
        key={columnId}
        name={columnName}
        menuIcon={'caret-down'}
        menuRenderer={() => renderMenu(columnId)}
      >
        {formula && (
          <BinButton
            data-testid={`deleteCalculatedColumn-${columnId}`}
            icon="trash"
            onClick={() => deleteCalculatedColumn(columnId)}
          />
        )}
      </ColumnHeaderCell2>
    );
  };

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    const { columnId, columnType } = allColumns[columnIndex];
    const value = formattedData[rowIndex][columnId];

    if (columnType === 'time') {
      return <Cell>{formatDateTime(String(value))}</Cell>;
    }

    return <Cell>{String(value)}</Cell>;
  };

  const cols = allColumns.map(({ columnId, columnName }) => (
    <Column
      key={columnId}
      cellRenderer={cellRenderer}
      name={columnName}
      columnHeaderCellRenderer={headerCellRenderer}
    />
  ));

  return (
    <>
      <TableContainer>
        <StyledTable2
          defaultRowHeight={35}
          numRows={formattedData?.length}
          cellRendererDependencies={[sortedIndexMap]}
        >
          {cols}
        </StyledTable2>

        {aggregateFuncResult && (
          <ResultContainer>
            {`Aggregate function calculation: ${aggregateFuncResult}`}
            <ClearButton onClick={() => setAggregateFuncResult('')}>
              x
            </ClearButton>
          </ResultContainer>
        )}
      </TableContainer>
    </>
  );
};
