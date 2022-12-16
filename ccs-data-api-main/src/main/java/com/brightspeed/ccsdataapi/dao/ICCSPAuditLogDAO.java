package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import com.brightspeed.ccsdataapi.model.CCSPAuditLog;

public interface ICCSPAuditLogDAO {
    public List<CCSPAuditLog> getAuditLogList();
    public String save(CCSPAuditLog auditLog);
    public String update(CCSPAuditLog auditLog);
    public String delete(CCSPAuditLog auditLog);
}
