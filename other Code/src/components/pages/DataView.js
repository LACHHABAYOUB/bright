import React, { useState, useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AppContainerFixed, RowContainer, TitleTextMedium } from "../my-styled/common";
import { NavigationBar } from "../NavigationBar";
import TableContainer from "../tables/TableContainer";
import EditTableContainer from "../tables/EditTableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { tableConfigs } from "../data/data-configurations";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import { useMyUser } from "../useMyUser";
import { Alert, Button } from "react-bootstrap";
import { properties } from "../properties";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { format } from 'date-fns';
import { useToken } from "../useToken";
//const _ = require('lodash');

const Styles = styled.div`
width: 90%;
  padding: 1rem;
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;

  .table {
    border-spacing: 0;
    border: 1px solid black;

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: hidden;
      height: 250px;
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        right: 0;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`
export const DataView = () => {
  const [dataVerison, setDataVerison] = useState(0);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [tableName, setTableName] = useState("");
  const [progressLabel, setProgressLabel] = useState("Retrieving data from ");
  const [dbOpLabel, setDbOpLabel] = useState("");
  const [isEditTable, setIsEditTable] = useState(false);
  const [userCanEdit, setUserCanEdit] = useState(true);
  const userRole = useMyUser();
  const userInfo = useToken();
  const baseUrl = properties.BASE_URL || "http://localhost:8081";
  const DEVAPIURL = properties.DEV_API_URL;
  const PRDAPIURL = properties.PRD_API_URL;
  const [showProductionWarning, setShowProductionWarning] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [rowIdsToProcess, setRowIdsToProcess] = useState([]);
  const [rowsToProcess, setRowsToProcess] = useState([]);
  const [disableConfirmChanges, setDisableConfirmChanges] = useState(true);
  const radios = [
    { name: 'Development', value: '1' },
    { name: 'Production', value: '2' },
  ];
  const [isProduction, setIsProduction] = useState(false);
  const [rowKey, setRowKey] = useState("");
  const [tableConfig, setTableConfig] = useState("");
  const [selectTableHeader, setSelectTableHeader] = useState("Development Tables");
  const [showDbOpResult, setShowDbOpResult] = useState(false);

  /**
   * Update data
   * We need to keep the table from resetting the pageIndex when we
   * update data. So we can keep track of that flag with a ref.
   * When our cell renderer calls updateMyData, we'll use
   * the rowIndex, columnId and new value to update the
   * original data
   * 
   * @param {*} rowIndex 
   * @param {*} columnId 
   * @param {*} value 
   */
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row;
      })
    )
  };

  /**
   * After data changes, we turn the flag back off
   * so that if data actually changes when we're not
   * editing it, the page is reset
   */
  React.useEffect(() => {
    setSkipPageReset(false);
    console.log("**data changed***")
  }, [data]);


  /**
   * Enable/disable confirm changes and delete rows buttons
   */
  React.useEffect(() => {
    (Object.keys(rowIdsToProcess).length > 0) ? setDisableConfirmChanges(false) : setDisableConfirmChanges(true);
  }, [rowIdsToProcess]);

  React.useEffect(() => {
    (isProduction) ? setSelectTableHeader("Production tables:") : setSelectTableHeader("Development tables:");
  }, [isProduction]);
  /**
   * Resets data to original source
   *  
   */
  const resetData = () => setData(originalData);

  /**
   * Memoization of columns
   */
  const fCols = useMemo(() => {
    return columns;
  }, [columns]);

  /**
   * Memoization of data
   */
  const fData = useMemo(() => {
    return data;
  }, [data]);


  /**
   * Fetch data based on selected table
   * 
   * @param {*} option 
   */
  const onTableSelected = (option) => {
    //setConfirmChangesData([]);

    // get columns and table_name
    let t_config = tableConfigs.find(obj => {
      return obj.table_name === option;
    });
    setTableConfig(t_config);
    //console.log(table_config);
    setTableName(t_config.table_name);
    let role = userRole.split("|")[1];
    setUserCanEdit(t_config.editRoles.includes(role));
    setIsEditTable(t_config.isEditable);
    setData([]);
    setOriginalData([]);
    setColumns([]);
    setColumns(t_config.columns);
    setRowKey(t_config.rowKey);
    doFetchTableInfo(t_config.table_name, t_config.columnsQuery);
    setRowIdsToProcess([]);
    setRowsToProcess([]);
  };
  /**
   * Fetches data for specifiec table name and columns
   * 
   * @param {*} tableName 
   * @param {*} columns 
   */
  const doFetchTableInfo = async (tableName, columns) => {
    const random_number = Math.floor(Math.random() * 10) + 1;
    setProgressLabel("Retrieving data from ");
    setIsVisible(true);
    // refesh button disable state
    try {
      axios
        .post(baseUrl ? `${baseUrl}/${isProduction ? PRDAPIURL : DEVAPIURL}/getTableData` : `../${isProduction ? PRDAPIURL : DEVAPIURL}/getTableData`, {
          table_name: tableName,
          columns: columns,
          num_rows: 2000,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.data && response.data["P_OUTPUT"]) {
            let body = response.data["P_OUTPUT"];
            let tableData = [];
            for (let i of body) {
              tableData.push(i);
            }
            setData(tableData);
            setOriginalData(tableData);
            setIsVisible(false);
            setDataVerison(random_number);
          } else {
            setIsVisible(false);
            console.error("Error occurred!!");
          }

        });
    } catch (err) {
      setIsVisible(false);
      console.error(err.message);
    }
  };

  /**
   * 
   * @param {*} event 
   */
  const onChangeEnvSelect = (event) => {
    (event.currentTarget.id === "radio-0") ? setIsProduction(false) : setIsProduction(true);
    (event.currentTarget.id === "radio-0") ? setShowProductionWarning(false) : setShowProductionWarning(true);
    setData([]);
    setOriginalData([]);
    setColumns([]);
    setIsEditTable(false);
  };
  /**
   * Lowercase object properties for oracle CRUD
   * 
   * @param {*} obj 
   * @returns 
   */
  const toLowerKeys = (obj) => {
    return Object.keys(obj).reduce((accumulator, key) => {
      accumulator[key.toLowerCase()] = obj[key];
      return accumulator;
    }, {});
  }
  /**
   * Update row
   * 
   * @param {*} tableName 
   * @param {*} row 
   * @returns 
   */
  const updateRow = async (tableName, idx) => {
    let updateOp = "";
    setProgressLabel("Updating data in ");
    setIsVisible(true);


    let orig_data_row = toLowerKeys(originalData[idx]);
    let updated_data_row = toLowerKeys(data[idx]);
    let rowKeyValue = "";
    if (rowKey && rowKey.length > 0) {
      for (let [index, val] of rowKey.entries()) {
        let key = orig_data_row[`${val}`];
        // your code goes here
        if (val === "holiday_date") {
          key = format(new Date(Date.parse(key)), "yyyy/MM/dd");
        }
        (index < rowKey.length - 1) ? rowKeyValue += (key + "|") : rowKeyValue += key;
      }
    }
    // Format date properly for Oracle
    let payload = toLowerKeys(updated_data_row);
    if (tableName === "HOLIDAY") {
      updateOp = "/updateHoliday";
      let dt = format(new Date(payload["holiday_date"]), 'yyyy/MM/dd');
      payload.holiday_date = dt;
    } else if (tableName === "CALL_CENTER_HOURS") {
      updateOp = "/updateCCHours";
    } else if (tableName === "GENESYS_ROUTING_TABLE") {
      updateOp = "/updateGRTable";
    }
    // Add uniqueId
    payload["uniqueId"] = rowKeyValue;
    let config = {
      method: 'put',
      url: baseUrl ? `${baseUrl}/${isProduction ? PRDAPIURL : DEVAPIURL}${updateOp}` : `../${isProduction ? PRDAPIURL : DEVAPIURL}${updateOp}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(payload)
    };

    try {
      axios(config).then((response) => {
        if (response.data) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          console.error("Error occurred!!");
          return "Failure";
        }

      });
    } catch (err) {
      setIsVisible(false);
      console.error(err.message);
      return "Failure";
    }
    return;
  }
  /**
   * Perform delete operation on specified table
   * 
   * @param {*} tableName 
   * @param {*} row 
   * @returns 
   */
  const deleteRow = async (tableName, row) => {
    let deleteOp = "";
    setProgressLabel("Deleting data from ");
    setIsVisible(true);
    // Format date properly for Oracle
    let payload = toLowerKeys(row);
    if (tableName === "HOLIDAY") {
      deleteOp = "/deleteHoliday";
      let dt = format(new Date(payload["holiday_date"]), 'yyyy/MM/dd');
      payload.holiday_date = dt;
    } else if (tableName === "CALL_CENTER_HOURS") {
      deleteOp = "/deleteCCHours";
    } else if (tableName === "GENESYS_ROUTING_TABLE") {
      deleteOp = "/deleteGRTable";
    }

    try {
      axios
        .delete(baseUrl ? `${baseUrl}/${isProduction ? PRDAPIURL : DEVAPIURL}${deleteOp}` : `../${isProduction ? PRDAPIURL : DEVAPIURL}${deleteOp}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(payload)
        })
        .then((response) => {
          if (response.data) {
            //setIsVisible(false);
          } else {
            setIsVisible(false);
            console.error("Error occurred!!");
            return "Failure";
          }

        });
    } catch (err) {
      setIsVisible(false);
      console.error(err.message);
      return "Failure";
    }
    return "Success";
  };


  /**
   * Update selected rows
   * 
   * @param {*} tableName 
   * @param {*} tableConfig 
   * @returns 
   */
  const collectEditedRows = (tableName, tableConfig) => {
    let rowsArray = [];
    rowsToProcess.forEach((row) => {
      rowsArray.push({ "dataRow": row.original, "idx": row.index });
    });
    let successCount = 0;
    let failureCount = 0;
    Promise.allSettled(rowsArray.map(async row => {
      await updateRow(tableName, row.idx);
      await writeAuditLog(originalData[row.idx], data[row.idx], "COMMITTED", "UPDATE");
    })).then((results) => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].status === 'fulfilled') {
          console.log('Resolved : ' + (results[i].value || "success"));
          successCount++;
        } else if (results[i].status === 'rejected') {
          console.log('Rejected : ' + results[i].reason);
          failureCount++;
        }
      }
      //If all well, get new table data, make new call to retrieve updated table
      setData([]);
      setOriginalData([]);
      setColumns([]);
      setColumns(tableConfig.columns);
      setRowKey(tableConfig.rowKey);
      doFetchTableInfo(tableConfig.table_name, tableConfig.columnsQuery);
      setRowIdsToProcess([]);
      setRowsToProcess([]);
      // setDbOpLabel(`Successfully updated ${successCount} rows! ${failureCount} failures.`);
      // setShowDbOpResult(true);
    }); // Send request for each row


    return;
  };

  /**
   *  Delete selected rows
   * 
   * @param {*} tableName 
   * @param {*} tableConfig 
   * @returns 
   */
  const deleteSelectedRows = (tableName, tableConfig) => {
    let rowsArray = [];
    rowsToProcess.forEach((row) => {
      rowsArray.push({ "dataRow": row.original, "idx": row.index });
    });
    let successCount = 0;
    let failureCount = 0;
    Promise.allSettled(rowsArray.map(async row => {
      await deleteRow(tableName, row.dataRow);
      await writeAuditLog(originalData[row.idx], row.dataRow, "COMMITTED", "DELETE");
    })).then((results) => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].status === 'fulfilled') {
          console.log('Resolved : ' + (results[i].value || "success"));
          successCount++;
        } else if (results[i].status === 'rejected') {
          console.log('Rejected : ' + results[i].reason);
          failureCount++;
        }
      }
      //If all well, get new table data, make new call to retrieve updated table
      setData([]);
      setOriginalData([]);
      setColumns([]);
      setColumns(tableConfig.columns);
      setRowKey(tableConfig.rowKey);
      doFetchTableInfo(tableConfig.table_name, tableConfig.columnsQuery);
      setRowIdsToProcess([]);
      setRowsToProcess([]);
      // setDbOpLabel(`Successfully deleted ${successCount} rows! ${failureCount} failures.`);
      // setShowDbOpResult(true);
    }); // Send request for each row



    return;
  };

  const writeAuditLog = async (old_data, new_data, status, operation) => {
    let user = userInfo[0].split("|")[2];
    let rowKeyValue = "";
    old_data = toLowerKeys(old_data);
    new_data = toLowerKeys(new_data);
    if (rowKey && rowKey.length > 0) {
      for (let [index, val] of rowKey.entries()) {
        let key = old_data[`${val}`];
        // your code goes here
        if (val === "holiday_date") {
          key = format(new Date(Date.parse(key)), "yyyy/MM/dd");
        }
        (index < rowKey.length - 1) ? rowKeyValue += (key + "|") : rowKeyValue += key;
      }
    }
    if (tableName === "HOLIDAY") {
      let dt1 = format(new Date(old_data["holiday_date"]), 'yyyy/MM/dd');
      old_data.holiday_date = dt1;
      let dt2 = format(new Date(new_data["holiday_date"]), 'yyyy/MM/dd');
      new_data.holiday_date = dt2;
    }
    let audit_log = {
      table_name: tableName,
      old_row_data: JSON.stringify(old_data),
      new_row_data: JSON.stringify(new_data),
      updateby: user,
      row_key: rowKeyValue,
      operation: operation,
      environment: isProduction ? "PROD" : "DEV",
      status: status,
      approvedby: "",
      approved_date: ""
    };
    let config = {
      method: 'post',
      url: baseUrl ? `${baseUrl}/${isProduction ? PRDAPIURL : DEVAPIURL}/saveAuditLog` : `../${isProduction ? PRDAPIURL : DEVAPIURL}/saveAuditLog`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(audit_log)
    };

    try {
      axios(config).then((response) => {
        if (response.data) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          console.error("Error occurred!!");
          return "Failure";
        }

      });
    } catch (err) {
      setIsVisible(false);
      console.error(err.message);
      return "Failure";
    }
    //console.log("Audit Log: " + JSON.stringify(audit_log));

  }

  /**
   * Add empty row to table
   */
  const addRow = () => {
    let random_number = Math.floor(Math.random() * 10) + 1;
    let newRowData = originalData[0];
    Object.keys(newRowData).forEach(key => {
      newRowData[key] = "";
    });
    let newData = [];
    newData = [...originalData];
    newData.push(newRowData);
    setData(newData);
    setOriginalData(newData);
    resetData();
    setIsVisible(false);
    //setDataVerison(random_number);
  };

  return (

    <>
      <NavigationBar />
      {isVisible && <ProgressBar animated now={100} label={progressLabel + tableName} />}
      <br />
      <AppContainerFixed>
        <TitleTextMedium>{tableName} Data View</TitleTextMedium><br />
        <RowContainer>
          <Alert variant="danger" show={showProductionWarning} >
            Warning: Live Production data!!
          </Alert> &nbsp;&nbsp;&nbsp;&nbsp;

          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  onChangeEnvSelect(e);
                  setRadioValue(e.currentTarget.value)

                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup> &nbsp;&nbsp;&nbsp;&nbsp;
          <Alert variant="danger" show={showProductionWarning} >
            Warning: Live Production data!!
          </Alert>
        </RowContainer>
        {/* <Alert variant="success" show={showDbOpResult} dismissible>
          {dbOpLabel}
        </Alert> */}
        <RowContainer>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Table
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>{selectTableHeader}</Dropdown.Header>
              <Dropdown.Item
                onClick={() => onTableSelected("PLAID_LOG")}
              >
                PLAID_LOG
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("APPLICATION_LOG")}
              >
                APPLICATION_LOG
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("GENESYS_ROUTING_TABLE")}
              >
                GENESYS_ROUTING_TABLE
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("GENESYS_INTENT_GROUP")}
              >
                GENESYS_INTENT_GROUP
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("HOLIDAY")}
              >
                HOLIDAY
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("HOLIDAY_EXCEPTION")}
              >
                HOLIDAY_EXCEPTION
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("CALL_CENTER_HOURS")}
              >
                CALL_CENTER_HOURS
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("GENESYS_DNIS")}
              >
                GENESYS_DNIS
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onTableSelected("GENESYS_DNIS_ATTRIBUTE")}
              >
                GENESYS_DNIS_ATTRIBUTE
              </Dropdown.Item>
              {userCanEdit && <Dropdown.Item
                onClick={() => onTableSelected("CCSP_AUDIT_LOG")}
              >
                CCSP_AUDIT_LOG
              </Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>&nbsp;&nbsp;
          {((isEditTable) && (userCanEdit)) ? <> <Button onClick={resetData}>Reset Data</Button> &nbsp;&nbsp;<Button color='primary' disabled={disableConfirmChanges} onClick={() => collectEditedRows(tableName, tableConfig)}>Commit Changes</Button> &nbsp;&nbsp;<Button color='primary' disabled={disableConfirmChanges} onClick={() => deleteSelectedRows(tableName, tableConfig)}>Delete Selected Rows</Button> &nbsp;&nbsp;<Button color='primary' onClick={() => addRow()}>Add Row</Button></> : null}<br /><br />
        </RowContainer>
        <Styles>
          {((isEditTable) && (userCanEdit)) ? <EditTableContainer columns={fCols} data={fData} initialState={{ pageIndex: 0, pageSize: 10, }} updateMyData={updateMyData} skipPageReset={skipPageReset} setRowIdsToProcess={setRowIdsToProcess} setRowsToProcess={setRowsToProcess} dataVerison={dataVerison} /> : <TableContainer columns={fCols} data={fData} initialState={{ pageIndex: 0, pageSize: 10, }} />}
        </Styles>

      </AppContainerFixed>

    </>
  );
};
