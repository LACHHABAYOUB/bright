package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brightspeed.ccsdataapi.exception.EntityAlreadyExistsException;
import com.brightspeed.ccsdataapi.model.CCSPAuditLog;

@Repository
public class CCSPAuditLogDAO implements ICCSPAuditLogDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<CCSPAuditLog> getAuditLogList() {
        return jdbcTemplate.query(
                "SELECT "
                        + "id,table_name,old_row_data,new_row_data,updateby,update_date,row_key,operation,environment,status,approvedby,approved_date "
                        + "FROM ccsp_audit_log ",
                new BeanPropertyRowMapper<>(CCSPAuditLog.class));
    }

    @Override
    public String save(CCSPAuditLog auditLog) {
        try {
            jdbcTemplate.update(
                    "INSERT INTO ccsp_audit_log "
                            + "(table_name,old_row_data,new_row_data,updateby,row_key,operation,environment,status,approvedby,approved_date) "
                            + "VALUES (?,?,?,?,?,?,?,?,?,TO_DATE(?,'YYYY-MM-DD'))",
                    new Object[] { auditLog.getTable_name(), auditLog.getOld_row_data(),
                            auditLog.getNew_row_data(), auditLog.getUpdateby(),
                            auditLog.getRow_key(), auditLog.getOperation(), auditLog.getEnvironment(),auditLog.getStatus(), auditLog.getApprovedby(),
                            auditLog.getApproved_date() });
            return "Saved";
        } catch (DataAccessException e) {
            throw new EntityAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    public String update(CCSPAuditLog auditLog) {
        try {
            jdbcTemplate.update(
                    "UPDATE ccsp_audit_log "
                            + "SET table_name = ?,old_row_data = ?,new_row_data = ?,updateby = ?,update_date = TO_DATE(?,'YYYY-MM-DD'),row_key = ?, operation = ?, environment = ?, status = ?,approvedby = ?,approved_date = TO_DATE(?,'YYYY-MM-DD') "
                            + "WHERE id = ?",
                    new Object[] { auditLog.getTable_name(), auditLog.getOld_row_data(),
                            auditLog.getNew_row_data(), auditLog.getUpdateby(), auditLog.getUpdate_date(),
                            auditLog.getRow_key(), auditLog.getOperation(), auditLog.getEnvironment(),auditLog.getStatus(), auditLog.getApprovedby(),
                            auditLog.getApproved_date(), auditLog.getId() });
            return "Updated";
        } catch (DataAccessException e) {
            throw new EntityAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    public String delete(CCSPAuditLog auditLog) {
        jdbcTemplate.update(
                "DELETE FROM ccsp_audit_log WHERE id = ?",
                new Object[] { auditLog.getId() });
        return "Deleted";
    }

}
