package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brightspeed.ccsdataapi.exception.EntityAlreadyExistsException;
import com.brightspeed.ccsdataapi.model.CallCenterHours;

@Repository
public class CallCenterHoursDAO implements ICallCenterHoursDAO {
        @Autowired
        JdbcTemplate jdbcTemplate;

        @Override
        public List<CallCenterHours> getCCHList() {
                return jdbcTemplate.query(
                                "SELECT "
                                                + "call_center_code, time_zone, state_group, open_weekday, "
                                                + "closed_weekday, open_saturday, closed_saturday, "
                                                + "open_sunday, closed_sunday "
                                                + "FROM call_center_hours ",
                                new BeanPropertyRowMapper<>(CallCenterHours.class));
        }

        @Override
        public String save(CallCenterHours ccr) {
                try {
                        jdbcTemplate.update(
                                        "INSERT INTO call_center_hours "
                                                        + "(call_center_code, time_zone, state_group, open_weekday, "
                                                        + "closed_weekday, open_saturday, closed_saturday, "
                                                        + "open_sunday, closed_sunday )"
                                                        + "VALUES (?,?,?,?,?,?,?,?,?)",
                                        new Object[] { ccr.getCall_center_code(), ccr.getTime_zone(), ccr.getState_group(),
                                                        ccr.getOpen_weekday(),
                                                        ccr.getClosed_weekday(), ccr.getOpen_saturday(),
                                                        ccr.getClosed_saturday(), ccr.getOpen_sunday(),
                                                        ccr.getClosed_sunday() });
                        return "Saved";
                } catch (DataAccessException e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

        @Override
        public String update(CallCenterHours ccr) {
                try {
                        jdbcTemplate.update(
                                        "UPDATE call_center_hours "
                                                        + "SET call_center_code = ?, time_zone = ?, state_group = ?, "
                                                        + "open_weekday = ?, closed_weekday = ?, open_saturday = ?, closed_saturday = ?, "
                                                        + "open_sunday = ?, closed_sunday = ? "
                                                        + "WHERE call_center_code = ? AND time_zone = ? AND state_group = ?",
                                        new Object[] { ccr.getCall_center_code(), ccr.getTime_zone(), ccr.getState_group(),
                                                        ccr.getOpen_weekday(),
                                                        ccr.getClosed_weekday(), ccr.getOpen_saturday(),
                                                        ccr.getClosed_saturday(),
                                                        ccr.getOpen_sunday(),
                                                        ccr.getClosed_sunday(), ccr.getUniqueId().split("\\|")[0],
                                                        ccr.getUniqueId().split("\\|")[1],
                                                        ccr.getUniqueId().split("\\|")[2] });
                        return "Updated";
                } catch (DataAccessException e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

        @Override
        public String delete(CallCenterHours ccr) {
                try {
                        jdbcTemplate.update(
                                        "DELETE FROM call_center_hours WHERE call_center_code = ? AND time_zone = ? AND state_group = ?",
                                        new Object[] { ccr.getCall_center_code(), ccr.getTime_zone(),
                                                        ccr.getState_group() });
                        return "Deleted";
                } catch (Exception e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

}
