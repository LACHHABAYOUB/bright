package com.brightspeed.ccsdataapi.model;

public class SQLStatement {

    private String sql_statement;

    public String getSql_statement() {
        return sql_statement;
    }

    public void setSql_statement(String sql_statement) {
        this.sql_statement = sql_statement;
    }
    @Override
    public String toString() {
        return "{" +
            " sql_statement='" + getSql_statement() + "'" +
            "}";
    }
 
}
