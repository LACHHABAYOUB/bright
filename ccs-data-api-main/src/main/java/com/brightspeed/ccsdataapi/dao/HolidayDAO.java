package com.brightspeed.ccsdataapi.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brightspeed.ccsdataapi.exception.EntityAlreadyExistsException;
import com.brightspeed.ccsdataapi.model.Holiday;

@Repository
public class HolidayDAO implements IHolidayDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Holiday> getHolidayList() {
        return jdbcTemplate.query(
                "SELECT "
                        + "holiday_date, description "
                        + "FROM holiday ",
                new BeanPropertyRowMapper<>(Holiday.class));
    }

    @Override
    public String save(Holiday holiday) {
        try {
            jdbcTemplate.update(
                    "INSERT INTO holiday "
                            + "(holiday_date, description) "
                            + "VALUES (TO_DATE(?,'YYYY-MM-DD'),?)",
                    new Object[] { holiday.getHoliday_date(), holiday.getDescription() });
            return "Saved";
        } catch (DataAccessException e) {
            throw new EntityAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    public String update(Holiday holiday) {
        try {
            jdbcTemplate.update(
                    "UPDATE holiday "
                            + "SET holiday_date = TO_DATE(?,'YYYY-MM-DD'),description = ? "
                            + "WHERE holiday_date = TO_DATE(?,'YYYY-MM-DD') AND description = ?",
                    new Object[] { holiday.getHoliday_date(), holiday.getDescription(),
                            holiday.getUniqueId().split("\\|")[0], holiday.getUniqueId().split("\\|")[1] });
            return "Updated";
        } catch (DataAccessException e) {
            throw new EntityAlreadyExistsException(e.getMessage());
        }
    }

    @Override
    public String delete(Holiday holiday) {
        try {
            jdbcTemplate.update(
                    "DELETE FROM holiday WHERE holiday_date = TO_DATE(?,'YYYY-MM-DD') AND description = ?",
                    new Object[] { holiday.getHoliday_date(), holiday.getDescription() });
            return "Deleted";
        } catch (Exception e) {
            throw new EntityAlreadyExistsException(e.getMessage());
        }

    }

}
