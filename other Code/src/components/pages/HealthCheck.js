import React, { useState, useMemo, useEffect } from "react";
import { AppContainerFixed, TitleTextMedium } from "../my-styled/common";
import { NavigationBar } from "../NavigationBar";
import Button from "react-bootstrap/Button";
import TableContainer from "../tables/TableContainer";
import { SelectColumnFilter } from "../filters";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from "axios";
import { FcHighPriority } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import styled from 'styled-components';
import { properties } from "../properties";

export const HealthCheck = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const progressLabel = "Retrieving Health Status...";
  const baseUrl = properties.BASE_URL || "http://localhost:8081";
  const SuccessIcon = styled(FcCheckmark)`
    transform: scale(1.5);
    margin-left: 50%;
  `;
  const FailIcon = styled(FcHighPriority)`
    transform: scale(2);
    margin-left: 50%;
  `;

  const columns = useMemo(
    () => [
      {
        Header: "Device",
        accessor: "device",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Address",
        accessor: "address",
        disableSortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        Cell: props => {
          return props.row.original.status === "SUCCESS" ? (
            <SuccessIcon />
          ) : (
            <FailIcon />
          );
        },
      },
      {
        Header: "Group",
        accessor: "grp",
        disableSortBy: false,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
    ],
    []
  );

  useEffect(() => {
    doFetch();
  }, []);
  /**
   * Retrieve Health check statuses
   */
  const doFetch = async () => {
    setIsVisible(true);
    // refesh button disable state
    axios
      .get(baseUrl?`${baseUrl}/CcsRestService/v1/healthCheck`:`../CcsRestService/v1/healthCheck`)
      .then((response) => {
        let body = response.data;
        // Convert to JSON
        let dataArray = [];
        let deviceDataArr = body.replace(/\n/g, "");
        let array = deviceDataArr.split(",");
        let grpName = "Database";
        for (let index in array) {
          let rowObj = {};
          let row = array[index];
          let rowSplit = row.split(":");

          // Split device ro get IP address for grouping
          let deviceSplit = rowSplit[0].trim().split("-");
          // Detect IP address for grouping
          let r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
          if (deviceSplit[1]) {
            let t = deviceSplit[1].match(r);
            if (t && t[0]) {
              grpName = t[0];
            }
          } else {
            grpName = deviceSplit[0].trim();
          }
          rowObj["device"] = deviceSplit[0].trim();
          rowObj["address"] = deviceSplit[1] ? deviceSplit[1].trim() : "";
          rowObj["status"] = rowSplit[1].trim();
          rowObj["grp"] = grpName;
          // console.log(rowObj);
          dataArray.push(rowObj);
        }

        setData(dataArray);
        setIsVisible(false);
      });
  };
  /**
   * Execute health check API call
   */
  const onClicked = () => {
    setData([]);
    doFetch();
  };

  return (
    <>
      <NavigationBar />
      {isVisible && <ProgressBar animated now={100} label={progressLabel} />}<br/>
      <AppContainerFixed>
        <TitleTextMedium>Health Check Status</TitleTextMedium><br />
        <Button variant="primary" onClick={onClicked}>
          Refresh Perform Health Check
        </Button><br />
        <TableContainer columns={columns} data={data} />
      </AppContainerFixed>
    </>
  );
};
