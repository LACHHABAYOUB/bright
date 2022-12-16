package com.brightspeed.ccsdataapi.model;

import java.util.Objects;

public class CCSPAuditLog {
    private int Id;
    private String table_name;
    private String old_row_data;
    private String new_row_data;
    private String updateby;
    private String update_date;
    private String row_key;
    private String status;
    private String approvedby;
    private String approved_date;
    private String operation;
    private String environment;

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public int getId() {
        return this.Id;
    }

    public void setId(int Id) {
        this.Id = Id;
    }

    public String getOperation() {
        return this.operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getTable_name() {
        return this.table_name;
    }

    public void setTable_name(String table_name) {
        this.table_name = table_name;
    }

    public String getOld_row_data() {
        return this.old_row_data;
    }

    public void setOld_row_data(String old_row_data) {
        this.old_row_data = old_row_data;
    }

    public String getNew_row_data() {
        return this.new_row_data;
    }

    public void setNew_row_data(String new_row_data) {
        this.new_row_data = new_row_data;
    }

    public String getUpdateby() {
        return this.updateby;
    }

    public void setUpdateby(String updateBy) {
        this.updateby = updateBy;
    }

    public String getUpdate_date() {
        return this.update_date;
    }

    public void setUpdate_date(String update_date) {
        this.update_date = update_date;
    }

    public String getRow_key() {
        return this.row_key;
    }

    public void setRow_key(String row_key) {
        this.row_key = row_key;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApprovedby() {
        return this.approvedby;
    }

    public void setApprovedby(String approvedBy) {
        this.approvedby = approvedBy;
    }

    public String getApproved_date() {
        return this.approved_date;
    }

    public void setApproved_date(String approved_date) {
        this.approved_date = approved_date;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CCSPAuditLog)) {
            return false;
        }
        CCSPAuditLog cCSP_AuditLog = (CCSPAuditLog) o;
        return Id == cCSP_AuditLog.Id && Objects.equals(table_name, cCSP_AuditLog.table_name) && Objects.equals(old_row_data, cCSP_AuditLog.old_row_data) && Objects.equals(new_row_data, cCSP_AuditLog.new_row_data) && Objects.equals(updateby, cCSP_AuditLog.updateby) && Objects.equals(update_date, cCSP_AuditLog.update_date) && Objects.equals(row_key, cCSP_AuditLog.row_key) && Objects.equals(status, cCSP_AuditLog.status) && Objects.equals(approvedby, cCSP_AuditLog.approvedby) && Objects.equals(approved_date, cCSP_AuditLog.approved_date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, table_name, old_row_data, new_row_data, updateby, update_date, row_key, status, approvedby, approved_date);
    }

    @Override
    public String toString() {
        return "{" +
            " Id='" + getId() + "'" +
            ", table_name='" + getTable_name() + "'" +
            ", old_row_data='" + getOld_row_data() + "'" +
            ", new_row_data='" + getNew_row_data() + "'" +
            ", updateBy='" + getUpdateby() + "'" +
            ", update_date='" + getUpdate_date() + "'" +
            ", row_key='" + getRow_key() + "'" +
            ", status='" + getStatus() + "'" +
            ", approvedBy='" + getApprovedby() + "'" +
            ", approved_date='" + getApproved_date() + "'" +
            "}";
    }    

}
