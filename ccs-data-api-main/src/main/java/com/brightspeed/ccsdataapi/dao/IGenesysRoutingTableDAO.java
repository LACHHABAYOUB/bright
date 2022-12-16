package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import com.brightspeed.ccsdataapi.model.GenesysRoutingTable;

public interface IGenesysRoutingTableDAO {
    public List<GenesysRoutingTable> getGRTList();
    public String save(GenesysRoutingTable grt);
    public String update(GenesysRoutingTable grt);
    public String delete(GenesysRoutingTable grt);
}
