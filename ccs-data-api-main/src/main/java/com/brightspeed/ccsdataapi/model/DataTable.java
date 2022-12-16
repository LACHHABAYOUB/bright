package com.brightspeed.ccsdataapi.model;

import java.util.Objects;

public class DataTable {
    private String table_name;
    private String columns;
    private int num_rows;
    
    public String getTable_name() {
        return table_name;
    }
    public void setTable_name(String table_name) {
        this.table_name = table_name;
    }
    public String getColumns() {
        return columns;
    }
    public void setColumns(String columns) {
        this.columns = columns;
    }
    public int getNum_rows() {
        return num_rows;
    }
    public void setNum_rows(int num_rows) {
        this.num_rows = num_rows;
    }

    @Override
    public String toString() {
        return "{" +
            " table_name='" + getTable_name() + "'" +
            ", columns='" + getColumns() + "'" +
            ", num_rows='" + getNum_rows() + "'" +
            "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DataTable)) {
            return false;
        }
        DataTable dataTable = (DataTable) o;
        return Objects.equals(table_name, dataTable.table_name) && Objects.equals(columns, dataTable.columns) && num_rows == dataTable.num_rows;
    }

    @Override
    public int hashCode() {
        return Objects.hash(table_name, columns, num_rows);
    }
    
}
