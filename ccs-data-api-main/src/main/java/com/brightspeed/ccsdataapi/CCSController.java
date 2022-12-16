package com.brightspeed.ccsdataapi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brightspeed.ccsdataapi.dao.ICCSPAuditLogDAO;
import com.brightspeed.ccsdataapi.dao.ICallCenterHoursDAO;
import com.brightspeed.ccsdataapi.dao.IGenesysRoutingTableDAO;
import com.brightspeed.ccsdataapi.dao.IHolidayDAO;
import com.brightspeed.ccsdataapi.model.CCSPAuditLog;
import com.brightspeed.ccsdataapi.model.CallCenterHours;
import com.brightspeed.ccsdataapi.model.DataTable;
import com.brightspeed.ccsdataapi.model.GenesysRoutingTable;
import com.brightspeed.ccsdataapi.model.Holiday;
import com.brightspeed.ccsdataapi.model.SQLStatement;

@RestController
public class CCSController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    IHolidayDAO holidayDAO;
    @Autowired
    ICallCenterHoursDAO callCenterDAO;
    @Autowired
    IGenesysRoutingTableDAO genesysRoutingDAO;
    @Autowired
    ICCSPAuditLogDAO ccspAuditLogDAO;

    private SimpleJdbcCall simpleJdbcCall;

    @GetMapping("/")
    public String ccs_data_api() {
        return "Welcome to the CCS Data API!";
    }

    // Holiday DAO functions
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getHolidayList")
    public List<Holiday> getHolidayList() {
        return holidayDAO.getHolidayList();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/saveHoliday")
    public String save(@RequestBody Holiday holiday) {
        return holidayDAO.save(holiday);
    }

    @CrossOrigin(origins = "*")
    @PutMapping(value = "/updateHoliday")
    public String update(@RequestBody Holiday holiday) {
        return holidayDAO.update(holiday);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/deleteHoliday")
    public String delete(@RequestBody Holiday holiday) {
        return holidayDAO.delete(holiday);
    }

    // Call Center Hours DAO functions
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getCCHList")
    public List<CallCenterHours> getCCHList() {
        return callCenterDAO.getCCHList();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/saveCCHours")
    public String save(@RequestBody CallCenterHours cch) {
        return callCenterDAO.save(cch);
    }

    @CrossOrigin(origins = "*")
    @PutMapping(value = "/updateCCHours")
    public String update(@RequestBody CallCenterHours cch) {
        return callCenterDAO.update(cch);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/deleteCCHours")
    public String delete(@RequestBody CallCenterHours cch) {
        return callCenterDAO.delete(cch);
    }

    // Genesys Routing DAO functions
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getGRTList")
    public List<GenesysRoutingTable> getGRTList() {
        return genesysRoutingDAO.getGRTList();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/saveGRTable")
    public String save(@RequestBody GenesysRoutingTable grt) {
        return genesysRoutingDAO.save(grt);
    }

    @CrossOrigin(origins = "*")
    @PutMapping(value = "/updateGRTable")
    public String update(@RequestBody GenesysRoutingTable grt) {
        return genesysRoutingDAO.update(grt);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/deleteGRTable")
    public String delete(@RequestBody GenesysRoutingTable grt) {
        return genesysRoutingDAO.delete(grt);
    }

    // CCSP Audit Log DAO functions
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/getAuditLogList")
    public List<CCSPAuditLog> getAuditLogList() {
        return ccspAuditLogDAO.getAuditLogList();
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/saveAuditLog")
    public String save(@RequestBody CCSPAuditLog cal) {
        return ccspAuditLogDAO.save(cal);
    }

    @CrossOrigin(origins = "*")
    @PutMapping(value = "/updateAuditLog")
    public String update(@RequestBody CCSPAuditLog cal) {
        return ccspAuditLogDAO.update(cal);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/deleteAuditLog")
    public String delete(@RequestBody CCSPAuditLog cal) {
        return ccspAuditLogDAO.delete(cal);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/getTableData", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE })
    public Map<String, Object> getTableData(@RequestBody DataTable table) {

        System.out.println(table.toString());
        jdbcTemplate.setResultsMapCaseInsensitive(true);
        simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("get_table_data");
        SqlParameterSource paramaters = new MapSqlParameterSource().addValue("p_table_name", table.getTable_name())
                .addValue("p_col_names", table.getColumns()).addValue("p_num_rows", table.getNum_rows());
        Map<String, Object> ls = new HashMap<String, Object>();
        try {
            ls = simpleJdbcCall.execute(paramaters);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ls;

    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/runStatement", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE })
    public Map<String, Object> runSqlStatement(@RequestBody SQLStatement sql) {
        System.out.println(sql.toString());
        jdbcTemplate.setResultsMapCaseInsensitive(true);
        simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("run_statement");
        SqlParameterSource paramaters = new MapSqlParameterSource().addValue("p_statement", sql.getSql_statement());

        Map<String, Object> ls = new HashMap<String, Object>();

        try {
            ls = simpleJdbcCall.execute(paramaters);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ls;
    }

}
