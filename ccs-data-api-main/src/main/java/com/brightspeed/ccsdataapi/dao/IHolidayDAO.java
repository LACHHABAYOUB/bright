package com.brightspeed.ccsdataapi.dao;
import java.util.List;

import com.brightspeed.ccsdataapi.model.Holiday;

public interface IHolidayDAO {
    public List<Holiday> getHolidayList();
    public String save(Holiday holiday);
    public String update(Holiday holiday);
    public String delete(Holiday holiday);
}
