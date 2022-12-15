import React, { useState } from "react";
import { AppContainerFixed, RowContainer, TitleTextMedium } from "../my-styled/common";
import { NavigationBar } from "../NavigationBar";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { dangerous_keywords } from "../data/dangerous_keywords";
import TableContainer from "../tables/TableContainer";
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import { properties } from "../properties";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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

export const CustomDataView = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [validated, setValidated] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showFailure01, setShowFailure01] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const progressLabel = "Retrieving data...";
  const baseUrl = properties.BASE_URL || "http://localhost:8081";
  const DEVAPIURL = properties.DEV_API_URL;
  const PRDAPIURL = properties.PRD_API_URL;
  const [showProductionWarning, setShowProductionWarning] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Development', value: '1' },
    { name: 'Production', value: '2' },
  ];
  const [isProduction, setIsProduction] = useState(false);

  // Form submission amd validation
  const [value, setValue] = useState(),
    onInput = ({ target: { value } }) => setValue(value),
    onFormSubmit = e => {
      setShowFailure(false);
      setShowSuccess(false);
      setShowFailure01(false);
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      e.preventDefault();
      validateSQL(value.toUpperCase());
      //setValue('');
      setColumns([]);
      setData([]);
    };

  const validateSQL = (sqlText) => {
    let sqlTrim = sqlText.trim();
    sqlTrim = sqlTrim.replace(/\r?\n|\r/g, " ");
    //console.log(sqlTrim);
    // Validate SQL contains no dangerous keywords
    let bad = 0;
    dangerous_keywords.map(keyword => {
      return (sqlTrim.indexOf(keyword) > -1) ? bad++ : '';
    });
    console.log('Number of keywords detected: ' + bad);
    if (bad === 0) {
      let limitSQL = " FETCH FIRST 2000 ROWS ONLY";
      // Fetch data
      doFetchTableInfo(sqlTrim + limitSQL);
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  };
  /**
   * Retrieve Health check statuses
   */
  const doFetchTableInfo = async (sql) => {
    setIsVisible(true);
    // refesh button disable state
    try {
      axios
        .post(baseUrl?`${baseUrl}/${isProduction?PRDAPIURL:DEVAPIURL}/runStatement`:`../${isProduction?PRDAPIURL:DEVAPIURL}/runStatement`, {
          sql_statement: sql,
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          setShowSuccess(false);
          if (response.data && response.data["P_OUTPUT"]) {

            let body = response.data["P_OUTPUT"];
            let tableData = [];
            let columnData = []

            let cols = body[0];

            for (let name in cols) {
              let colObj = {};
              colObj["Header"] = name;
              colObj["accessor"] = name;
              columnData.push(colObj);
            }
            setColumns(columnData);
            // Process data and get columns
            for (let i of body) {
              tableData.push(i);
            }
            setData(tableData);
            setShowSuccess(false);
            setIsVisible(false);
          } else {
            setShowFailure01(true);
            setIsVisible(false);
          }

        }).catch((err => {
          setShowSuccess(false);
          setShowFailure01(true);
          setIsVisible(false);
        }));
    } catch (err) {
      setShowSuccess(false);
      console.error(err.message);
      setIsVisible(false);
    }
  };
  const onChangeEnvSelect = (event) => {
    (event.currentTarget.id === "radio-0")?setIsProduction(false):setIsProduction(true);
    (event.currentTarget.id === "radio-0")?setShowProductionWarning(false):setShowProductionWarning(true);
    setColumns([]);
    setData([]);
  };
  return (
    <>
      <NavigationBar />
      {isVisible && <ProgressBar animated now={100} label={progressLabel} />}<br/>
      <AppContainerFixed>
      <TitleTextMedium>Custom Data View</TitleTextMedium><br />
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
        
        <Alert variant="danger" show={showFailure} onClose={() => setShowFailure(false)} dismissible>You entered a dangerous SQL statement, please modify statement and resubmit.</Alert>
        <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>SQL successfully submitted! Please wait for results to return.</Alert>
        <Alert variant="danger" show={showFailure01} onClose={() => setShowFailure01(false)} dismissible>Your statement returned no data or contained syntax errors, please modify statement and resubmit.</Alert>
        <Form className="w-75" onSubmit={onFormSubmit}>
          <Form.Group
            className="mb-3"
            controlId="customSql.ControlTextarea">
            <Form.Label>Enter SQL Query:</Form.Label>
            <Form.Control required className="w-100" as="textarea" placeholder="eg. SELECT * FROM [TABLE_NAME], SELECT [col], [col] from [TABLE_NAME]" onChange={onInput} value={value} />
          </Form.Group>
          <Button type="submit" >Execute SQL</Button>
        </Form>
        <Styles>
          <TableContainer columns={columns} data={data} />
        </Styles>
      </AppContainerFixed>
    </>


  )
}