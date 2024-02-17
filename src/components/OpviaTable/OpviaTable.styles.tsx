import styled from 'styled-components';
import { Table2 } from '@blueprintjs/table';
import { Button, Menu } from '@blueprintjs/core';

// This wrapper component is necessary to make Table2 compatible with styled-components.
const Table2Wrapper = ({ ...props }) => {
  return <Table2 {...props} />;
};

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: max-content;
  max-width: calc(100% - 100px);
  height: 95vh;
  padding: 15px;

  background-color: #ffffff;
  border: 1px solid #d6d9dc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTable2 = styled(Table2Wrapper)`
  .bp4-table-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  .bp4-table-header-content {
    width: fit-content;
    margin-right: 2px;

    :hover {
      background-color: #f5f8fa !important;
    }
  }

  /* Table header styles */
  .bp4-table-quadrant-top .bp4-table-header {
    background-color: #2dd3bf;
    color: white;
    line-height: 30px;
    font-weight: bold;
    box-shadow: inset -1px 0 0 0 rgba(16, 22, 26, 0.15);
  }

  /* Column header menu button styles */
  .bp4-table-th-menu-container {
    opacity: inherit !important;
    padding-top: 1px;
  }

  .bp4-table-th-menu-container .bp4-icon {
    background-color: black;
    fill: white;
  }

  .bp4-table-row-headers {
    background-color: #2dd3bf;
    color: white;
    border-right: 1px solid #e1e8ed;
  }

  .bp4-table-header .bp4-table-row-name {
    margin-top: 2px;
  }

  /* Table row styles for alternating backgrounds */
  .bp4-table-cell-ledger-odd {
    background-color: rgba(45, 211, 191, 0.1);
  }
  .bp4-table-cell-ledger-even {
    background-color: white;
  }

  .bp4-table-cell {
    padding: 8px;
    text-align: left;
    color: black;
    font-weight: 500;

    border-bottom: none;
    border-right: none;
  }
`;

export const StyledMenu = styled(Menu)`
  .bp5-menu-item {
    background-color: #383e47;
    color: white;
    border-radius: 4px;
    margin-bottom: 2px;
    font-size: 10px;

    :hover {
      background-color: #4b515b;
    }
  }

  span.bp5-popover-target {
    display: inline-block;
    width: 100%;
  }
`;

export const BinButton = styled(Button)`
  background-color: #2dd3bf !important;
  border: none !important;
  box-shadow: none !important;

  .bp5-icon {
    color: red;
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2px 10px;
  margin-top: 2px;

  /* Black border */
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  background-color: #2dd3bf;
  color: yellow;
  font-weight: bold;
`;

export const ClearButton = styled(Button)`
  background-color: #2dd3bf !important;
  color: rgb(220 38 38) !important;
  box-shadow: none !important;
  border: none;
  font-weight: 500;
  }
`;
