package com.brightspeed.ccsdataapi.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brightspeed.ccsdataapi.exception.EntityAlreadyExistsException;
import com.brightspeed.ccsdataapi.model.GenesysRoutingTable;

@Repository
public class GenesysRoutingTableDAO implements IGenesysRoutingTableDAO {
        @Autowired
        JdbcTemplate jdbcTemplate;

        @Override
        public List<GenesysRoutingTable> getGRTList() {
                return jdbcTemplate.query(
                                "SELECT "
                                                + "intent_group, segment_code, queuename, skill1, "
                                                + "skill2, skill3, skill4, skill5, skill6, skill7, skill8, "
                                                + "skill9, skill10, skill11, skill12, skill13, skill14, skill15 "
                                                + "FROM genesys_routing_table ",
                                new BeanPropertyRowMapper<>(GenesysRoutingTable.class));
        }

        @Override
        public String save(GenesysRoutingTable grt) {
                try {
                        jdbcTemplate.update(
                                        "INSERT INTO genesys_routing_table "
                                                        + "(intent_group, segment_code, queuename, skill1, "
                                                        + "skill2, skill3, skill4, skill5, skill6, skill7, skill8, "
                                                        + "skill9, skill10, skill11, skill12, skill13, skill14, skill15 )"
                                                        + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                        new Object[] { grt.getIntent_group(), grt.getSegment_code(), grt.getQueuename(),
                                                        grt.getSkill1(),
                                                        grt.getSkill2(), grt.getSkill3(), grt.getSkill4(),
                                                        grt.getSkill5(), grt.getSkill6(),
                                                        grt.getSkill7(), grt.getSkill8(), grt.getSkill9(),
                                                        grt.getSkill10(), grt.getSkill11(),
                                                        grt.getSkill12(), grt.getSkill13(), grt.getSkill14(),
                                                        grt.getSkill15()
                                        });
                        return "Saved";
                } catch (DataAccessException e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

        @Override
        public String update(GenesysRoutingTable grt) {
                try {
                        jdbcTemplate.update(
                                        "UPDATE genesys_routing_table "
                                                        + "SET intent_group = ?, segment_code = ?, queuename = ?, "
                                                        + "skill1 = ?, skill2 = ?, skill3 = ?, skill4 = ?, skill5 = ?, skill6 = ?, skill7 = ?, skill8 = ?, skill9 = ?, "
                                                        + "skill10 = ?, skill11 = ?, skill12 = ?, skill13 = ?, skill14 = ?, skill15 = ? "
                                                        + "WHERE intent_group = ? AND segment_code = ?",
                                        new Object[] { grt.getIntent_group(), grt.getSegment_code(), grt.getQueuename(),
                                                        grt.getSkill1(),
                                                        grt.getSkill2(), grt.getSkill3(), grt.getSkill4(),
                                                        grt.getSkill5(),
                                                        grt.getSkill6(),
                                                        grt.getSkill7(), grt.getSkill8(), grt.getSkill9(),
                                                        grt.getSkill10(),
                                                        grt.getSkill11(),
                                                        grt.getSkill12(), grt.getSkill13(), grt.getSkill14(),
                                                        grt.getSkill15(),
                                                        grt.getUniqueId().split("\\|")[0],
                                                        grt.getUniqueId().split("\\|")[1] });
                        return "Updated";
                } catch (DataAccessException e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

        @Override
        public String delete(GenesysRoutingTable grt) {
                try {
                        jdbcTemplate.update(
                                        "DELETE FROM genesys_routing_table WHERE intent_group = ? AND segment_code = ?",
                                        new Object[] { grt.getIntent_group(), grt.getSegment_code() });
                        return "Deleted";
                } catch (Exception e) {
                        throw new EntityAlreadyExistsException(e.getMessage());
                }

        }

}
