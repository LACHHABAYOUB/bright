import { SelectColumnFilter } from "../filters";
import { format } from "date-fns";

export const tableConfigs = [
  {
    "table_name": "PLAID_LOG",
    "columnsQuery": "TIME_STAMP,UCID,ENTRY_TYPE,ELAPSED_MILLISECONDS,STATUS_CODE,ADDITIONAL_INFORMATION",
    "columns": [
      {
        Header: "TIME STAMP",
        accessor: "TIME_STAMP",
        isSorted: true,
        isSortedDesc: "desc",
      },
      {
        Header: "UCID",
        accessor: "UCID",
      },
      {
        Header: "ENTRY TYPE",
        accessor: "ENTRY_TYPE",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "ELAPSED MILLISECONDS",
        accessor: "ELAPSED_MILLISECONDS",
      },
      {
        Header: "STATUS CODE",
        accessor: "STATUS_CODE",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "ADDITIONAL INFORMATION",
        accessor: "ADDITIONAL_INFORMATION",
      }
    ],
    "sortBy": "TIME_STAMP",
    "direction": "DESC",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "APPLICATION_LOG",
    "columnsQuery": "HOST_NAME,MESSAGE,ENTRY_TYPE,CONTEXT_INFORMATION,STACK_TRACE,TIME_STAMP",
    "columns": [
      {
        Header: "TIME STAMP",
        accessor: "TIME_STAMP",
        desc: true
      },
      {
        Header: "HOST NAME",
        accessor: "HOST_NAME",
      },
      {
        Header: "ENTRY TYPE",
        accessor: "ENTRY_TYPE",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "MESSAGE",
        accessor: "MESSAGE",
      },
      {
        Header: "CONTEXT INFORMATION",
        accessor: "CONTEXT_INFORMATION",
      },
      {
        Header: "STACK TRACE",
        accessor: "STACK_TRACE",
      },

    ],
    "sortBy": "TIME_STAMP",
    "direction": "DESC",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "GENESYS_ROUTING_TABLE",
    "columnsQuery": "INTENT_GROUP,SEGMENT_CODE,QUEUENAME,SKILL1,SKILL2,SKILL3,SKILL4,SKILL5,SKILL6,SKILL7,SKILL8,SKILL9,SKILL10,SKILL11,SKILL12,SKILL13,SKILL14,SKILL15",
    "columns": [
      {
        Header: "INTENT GROUP",
        accessor: "INTENT_GROUP",
      },
      {
        Header: "SEGMENT CODE",
        accessor: "SEGMENT_CODE",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "QUEUENAME",
        accessor: "QUEUENAME",
      },
      {
        Header: "SKILL 1",
        accessor: "SKILL1",
      },
      {
        Header: "SKILL 2",
        accessor: "SKILL2",
      },
      {
        Header: "SKILL 3",
        accessor: "SKILL3",
      },
      {
        Header: "SKILL 4",
        accessor: "SKILL4",
      },
      {
        Header: "SKILL 5",
        accessor: "SKILL5",
      },
      {
        Header: "SKILL 6",
        accessor: "SKILL6",
      },
      {
        Header: "SKILL 7",
        accessor: "SKILL7",
      },
      {
        Header: "SKILL 8",
        accessor: "SKILL8",
      },
      {
        Header: "SKILL 9",
        accessor: "SKILL9",
      },
      {
        Header: "SKILL 10",
        accessor: "SKILL10",
      },
      {
        Header: "SKILL 11",
        accessor: "SKILL11",
      },
      {
        Header: "SKILL 12",
        accessor: "SKILL12",
      },
      {
        Header: "SKILL 13",
        accessor: "SKILL13",
      },
      {
        Header: "SKILL 14",
        accessor: "SKILL14",
      },
      {
        Header: "SKILL 15",
        accessor: "SKILL15",
      },
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": true,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
    "rowKey": ["intent_group", "segment_code"],
  },
  {
    "table_name": "GENESYS_INTENT_GROUP",
    "columnsQuery": "INTENT_GROUP,INTENT_GROUP_DESC,ROUTE_INTENT,ROUTE_INTENT_DESC",
    "columns": [
      {
        Header: "INTENT GROUP",
        accessor: "INTENT_GROUP",
      },
      {
        Header: "INTENT GROUP DESC",
        accessor: "INTENT_GROUP_DESC",
      },
      {
        Header: "ROUTE INTENT",
        accessor: "ROUTE_INTENT",
      },
      {
        Header: "ROUTE INTENT DESC",
        accessor: "ROUTE_INTENT_DESC",
      },
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "HOLIDAY",
    "columnsQuery": "holiday_date,description",
    "columns": [
      {
        Header: "HOLIDAY DATE",
        accessor: "HOLIDAY_DATE",
          // Cell: ({ value }) => {
          //   return format(new Date(value), "dd-MM-yyyy");
          // },

      },
      {
        Header: "DESCRIPTION",
        accessor: "DESCRIPTION",
      }
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": true,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
    "rowKey": ["holiday_date", "description"],
  },
  {
    "table_name": "HOLIDAY_EXCEPTION",
    "columnsQuery": "EXCEPTION_DATE,CALL_CENTER_CODE,DESCRIPTION,INCLUDE_EXCLUDE",
    "columns": [
      {
        Header: "EXCEPTION DATE",
        accessor: "EXCEPTION_DATE",
      },
      {
        Header: "CALL CENTER CODE",
        accessor: "CALL_CENTER_CODE",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "DESCRIPTION",
        accessor: "DESCRIPTION",
      },
      {
        Header: "INCLUDE EXCLUDE",
        accessor: "INCLUDE_EXCLUDE",
      }
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "GENESYS_DNIS",
    "columnsQuery": "DNIS,DNIS_TYPE",
    "columns": [
      {
        Header: "DNIS",
        accessor: "DNIS",
      },
      {
        Header: "DNIS TYPE",
        accessor: "DNIS_TYPE",
        Filter: SelectColumnFilter,
        filter: "equals",
      }
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "GENESYS_DNIS_ATTRIBUTE",
    "columnsQuery": "DNIS_TYPE,APPLICATION,TERRITORY,BUSINESS_UNIT,CUSTOMER_TYPE,LANGUAGE,PRODUCT_CATEGORY,CALL_CENTER_CODE,TWENTY_FOUR_BY_SEVEN",
    "columns": [
      {
        Header: "DNIS TYPE",
        accessor: "DNIS_TYPE",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "APPLICATION",
        accessor: "APPLICATION",
      },
      {
        Header: "TERRITORY",
        accessor: "TERRITORY",
      },
      {
        Header: "BUSINESS UNIT",
        accessor: "BUSINESS_UNIT",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "CUSTOMER TYPE",
        accessor: "CUSTOMER_TYPE",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "LANGUAGE",
        accessor: "LANGUAGE",
      },
      {
        Header: "PRODUCT CATEGORY",
        accessor: "PRODUCT_CATEGORY",
      },
      {
        Header: "CALL CENTER CODE",
        accessor: "CALL_CENTER_CODE",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "TWENTY FOUR BY SEVEN",
        accessor: "TWENTY_FOUR_BY_SEVEN",
      },
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
  {
    "table_name": "CALL_CENTER_HOURS",
    "columnsQuery": "CALL_CENTER_CODE,TIME_ZONE,STATE_GROUP,OPEN_WEEKDAY,CLOSED_WEEKDAY,OPEN_SATURDAY,CLOSED_SATURDAY,OPEN_SUNDAY,CLOSED_SUNDAY",
    "columns": [
      {
        Header: "CALL CENTER CODE",
        accessor: "CALL_CENTER_CODE",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "TIME ZONE",
        accessor: "TIME_ZONE",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",

      },
      {
        Header: "STATE GROUP",
        accessor: "STATE_GROUP",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "OPEN WEEKDAY",
        accessor: "OPEN_WEEKDAY",
      },
      {
        Header: "CLOSED WEEKDAY",
        accessor: "CLOSED_WEEKDAY",
      },
      {
        Header: "OPEN SATURDAY",
        accessor: "OPEN_SATURDAY",
      },
      {
        Header: "CLOSED SATURDAY",
        accessor: "CLOSED_SATURDAY",
      },
      {
        Header: "OPEN SUNDAY",
        accessor: "OPEN_SUNDAY",
      },
      {
        Header: "CLOSED SUNDAY",
        accessor: "CLOSED_SUNDAY",
      },
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": true,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
    "rowKey": ["call_center_code", "time_zone", "state_group"],
  },
  {
    "table_name": "CCSP_AUDIT_LOG",
    "columnsQuery": "ID,TABLE_NAME,OLD_ROW_DATA,NEW_ROW_DATA,UPDATEBY,UPDATE_DATE,ROW_KEY,OPERATION,ENVIRONMENT,STATUS,APPROVEDBY,APPROVED_DATE",
    "columns": [
      {
        Header: "ID",
        accessor: "ID",
      },
      {
        Header: "TABLE NAME",
        accessor: "TABLE_NAME",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "OLD ROW DATA",
        accessor: "OLD_ROW_DATA",
      },
      {
        Header: "NEW ROW DATA",
        accessor: "NEW_ROW_DATA",
      },
      {
        Header: "UPDATEBY",
        accessor: "UPDATEBY",
        Filter: SelectColumnFilter,
        filter: "equals",
        
      },
      {
        Header: "UPDATE DATE",
        accessor: "UPDATE_DATE",
        Cell: ({ value }) => {
          return format(new Date(value), "yyyy/MM/dd");
        },
      },
      {
        Header: "ROW KEY",
        accessor: "ROW_KEY",
      },
      {
        Header: "OPERATION",
        accessor: "OPERATION",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "ENVIRONMENT",
        accessor: "ENVIRONMENT",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "STATUS",
        accessor: "STATUS",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "APPROVED BY",
        accessor: "APPROVEDBY",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "APPROVED DATE",
        accessor: "APPROVED_DATE",
      },
    ],
    "sortBy": "",
    "direction": "",
    "isEditable": false,
    "editRoles": ["devadmin", "bizadmin"],
    "LOB": ["all", "repair"],
  },
]
