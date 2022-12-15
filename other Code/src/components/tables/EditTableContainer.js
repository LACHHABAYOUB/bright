import React, { Fragment, useState } from 'react';

import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from 'react-table';
import { Table, Row, Col, Button, Input } from 'reactstrap';
import { Filter, DefaultColumnFilter } from '../filters';

const EditTableContainer = ({ columns, data, initialState, updateMyData, skipPageReset, setRowIdsToProcess, setRowsToProcess, dataVerison }) => {
  React.useEffect(() => {
    toggleAllRowsSelected(false);
  }, [dataVerison])
  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, selectedRowIds, },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter, Cell: EditableCell, },
      initialState: { pageIndex: 0, pageSize: 10 },
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      autoResetSelectedRows: false,
      autoResetSelectedCell: false,
      autoResetSelectedColumn: false,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );


  /**
   * 
   * @param {*} column 
   * @returns 
   */
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  /**
   * 
   * @param {*} event 
   */
  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };
  /**
   * 
   * @param {*} event 
   */
  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  /**
   * 
   * @param {*} e 
   */
  // const checkboxClick = (e) => {
  //   console.log("Clicked " + JSON.stringify(e.target.value));
  // }

  /**
   * 
   */
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  );

  /**
   * 
   */
  React.useEffect(() => {
    (Object.keys(selectedRowIds).length > 0) ? setRowIdsToProcess(selectedRowIds) : setRowIdsToProcess([]);
    (Object.keys(selectedRowIds).length > 0) ? setRowsToProcess(selectedFlatRows) : setRowsToProcess([]);
  }, [selectedRowIds]);

  let index = 0;
  return (
    <Fragment>
      <Table bordered hover responsive size={"sm"} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            index++;
            return (
              <Fragment key={row.getRowProps().key}>
                <tr style={index % 2 ? { background: "#fdffe0" } : { background: "white" }}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {(pageOptions.length === 0) ? pageIndex + 0 : pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <Input
            type='select'
            value={pageSize}
            onChange={onChangeInSelect}
          >

            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Input>
        </Col>
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EditTableContainer;