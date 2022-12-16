package com.brightspeed.ccsdataapi.model;

import java.util.Objects;

public class CallCenterHours {
    private String call_center_code;
    private String time_zone;
    private String state_group;
    private String open_weekday;
    private String closed_weekday;
    private String open_saturday;
    private String closed_saturday;
    private String open_sunday;
    private String closed_sunday;
    private String uniqueId = "||";

    public String getUniqueId() {
        return this.uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public CallCenterHours() {
    }

    public String getCall_center_code() {
        return this.call_center_code;
    }

    public void setCall_center_code(String callCenterCode) {
        this.call_center_code = callCenterCode;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        resString.insert(0, callCenterCode);
        this.uniqueId = resString.toString();
    }

    public String getTime_zone() {
        return this.time_zone;
    }

    public void setTime_zone(String timeZone) {
        this.time_zone = timeZone;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        int idx = resString.indexOf("|", resString.indexOf("|") + 1);
        resString.insert(idx, timeZone);
        this.uniqueId = resString.toString();
    }

    public String getState_group() {
        return this.state_group;
    }

    public void setState_group(String stateGroup) {
        this.state_group = stateGroup;
        this.uniqueId += stateGroup;
    }

    public String getOpen_weekday() {
        return this.open_weekday;
    }

    public void setOpen_weekday(String openWeekday) {
        this.open_weekday = openWeekday;
    }

    public String getClosed_weekday() {
        return this.closed_weekday;
    }

    public void setClosed_weekday(String closedWeekday) {
        this.closed_weekday = closedWeekday;
    }

    public String getOpen_saturday() {
        return this.open_saturday;
    }

    public void setOpen_saturday(String openSaturday) {
        this.open_saturday = openSaturday;
    }

    public String getClosed_saturday() {
        return this.closed_saturday;
    }

    public void setClosed_saturday(String closedSaturday) {
        this.closed_saturday = closedSaturday;
    }

    public String getOpen_sunday() {
        return this.open_sunday;
    }

    public void setOpen_sunday(String openSunday) {
        this.open_sunday = openSunday;
    }

    public String getClosed_sunday() {
        return this.closed_sunday;
    }

    public void setClosed_sunday(String closedSunday) {
        this.closed_sunday = closedSunday;
    }

    @Override
    public String toString() {
        return "{" +
                " callCenterCode='" + getCall_center_code() + "'" +
                ", timeZone='" + getTime_zone() + "'" +
                ", stateGroup='" + getState_group() + "'" +
                ", openWeekday='" + getOpen_weekday() + "'" +
                ", closedWeekday='" + getClosed_weekday() + "'" +
                ", openSaturday='" + getOpen_saturday() + "'" +
                ", closedSaturday='" + getClosed_saturday() + "'" +
                ", openSunday='" + getOpen_sunday() + "'" +
                ", closedSunday='" + getClosed_sunday() + "'" +
                "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CallCenterHours)) {
            return false;
        }
        CallCenterHours callCenterHours = (CallCenterHours) o;
        return Objects.equals(call_center_code, callCenterHours.call_center_code)
                && Objects.equals(time_zone, callCenterHours.time_zone)
                && Objects.equals(state_group, callCenterHours.state_group)
                && Objects.equals(open_weekday, callCenterHours.open_weekday)
                && Objects.equals(closed_weekday, callCenterHours.closed_weekday)
                && Objects.equals(open_saturday, callCenterHours.open_saturday)
                && Objects.equals(closed_saturday, callCenterHours.closed_saturday)
                && Objects.equals(open_sunday, callCenterHours.open_sunday)
                && Objects.equals(closed_sunday, callCenterHours.closed_sunday);
    }

    @Override
    public int hashCode() {
        return Objects.hash(call_center_code, time_zone, state_group, open_weekday, closed_weekday, open_saturday,
                closed_saturday, open_sunday, closed_sunday);
    }

}
