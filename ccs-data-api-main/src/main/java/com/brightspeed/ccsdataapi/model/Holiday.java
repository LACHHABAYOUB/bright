package com.brightspeed.ccsdataapi.model;

import java.util.Objects;

public class Holiday {

    public Holiday() {
    }

    private String holiday_date;
    private String description;
   private String uniqueId = "|";

    public String getHoliday_date() {
        return this.holiday_date;
    }

    public void setHoliday_date(String holiday_date) {
        this.holiday_date = holiday_date;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        resString.insert(0, holiday_date);
        this.uniqueId = resString.toString();
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        int index = resString.indexOf("|")+1;
        resString.insert(index, description);
        this.uniqueId = resString.toString();
    }

    public String getUniqueId() {
        return this.uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    @Override
    public String toString() {
        return "{" +
            " holiday_date='" + getHoliday_date() + "'" +
            ", description='" + getDescription() + "'" +
            ", uniqueId='" + getUniqueId() + "'" +
            "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Holiday)) {
            return false;
        }
        Holiday holiday = (Holiday) o;
        return Objects.equals(holiday_date, holiday.holiday_date) && Objects.equals(description, holiday.description) && Objects.equals(uniqueId, holiday.uniqueId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(holiday_date, description, uniqueId);
    }

}
