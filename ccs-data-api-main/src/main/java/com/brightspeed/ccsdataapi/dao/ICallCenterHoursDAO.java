package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import com.brightspeed.ccsdataapi.model.CallCenterHours;

public interface ICallCenterHoursDAO {
    public List<CallCenterHours> getCCHList();
    public String save(CallCenterHours ccr);
    public String update(CallCenterHours ccr);
    public String delete(CallCenterHours ccr);
}
