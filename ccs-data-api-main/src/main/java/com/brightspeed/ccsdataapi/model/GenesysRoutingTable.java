package com.brightspeed.ccsdataapi.model;

import java.util.Objects;

public class GenesysRoutingTable {
    private String intent_group;
    private String segment_code;
    private String queuename;
    private String skill1;
    private String skill2;
    private String skill3;
    private String skill4;
    private String skill5;
    private String skill6;
    private String skill7;
    private String skill8;
    private String skill9;
    private String skill10;
    private String skill11;
    private String skill12;
    private String skill13;
    private String skill14;
    private String skill15;
    private String uniqueId = "|";

    public GenesysRoutingTable() {
    }

    public String getUniqueId() {
        return this.uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    /**
     * 
     * @return
     */
    public String getIntent_group() {
        return this.intent_group;
    }

    /**
     * 
     * @param intentGroup
     */
    public void setIntent_group(String intentGroup) {
        this.intent_group = intentGroup;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        resString.insert(0, intentGroup);
        this.uniqueId = resString.toString();
    }

    /**
     * 
     * @return
     */
    public String getSegment_code() {
        return this.segment_code;
    }

    /**
     * 
     * @param segmentCode
     */
    public void setSegment_code(String segmentCode) {
        this.segment_code = segmentCode;
        StringBuffer resString = new StringBuffer(this.uniqueId);
        int index = resString.indexOf("|")+1;
        resString.insert(index, segmentCode);
        this.uniqueId = resString.toString();
    }

    /**
     * 
     * @return
     */
    public String getQueuename() {
        return this.queuename;
    }

    public void setQueuename(String queueName) {
        this.queuename = queueName;
        //this.uniqueId += queueName;
    }

    public String getSkill1() {
        return this.skill1;
    }

    public void setSkill1(String skill1) {
        this.skill1 = skill1;
    }

    public String getSkill2() {
        return this.skill2;
    }

    public void setSkill2(String skill2) {
        this.skill2 = skill2;
    }

    public String getSkill3() {
        return this.skill3;
    }

    public void setSkill3(String skill3) {
        this.skill3 = skill3;
    }

    public String getSkill4() {
        return this.skill4;
    }

    public void setSkill4(String skill4) {
        this.skill4 = skill4;
    }

    public String getSkill5() {
        return this.skill5;
    }

    public void setSkill5(String skill5) {
        this.skill5 = skill5;
    }

    public String getSkill6() {
        return this.skill6;
    }

    public void setSkill6(String skill6) {
        this.skill6 = skill6;
    }

    public String getSkill7() {
        return this.skill7;
    }

    public void setSkill7(String skill7) {
        this.skill7 = skill7;
    }

    public String getSkill8() {
        return this.skill8;
    }

    public void setSkill8(String skill8) {
        this.skill8 = skill8;
    }

    public String getSkill9() {
        return this.skill9;
    }

    public void setSkill9(String skill9) {
        this.skill9 = skill9;
    }

    public String getSkill10() {
        return this.skill10;
    }

    public void setSkill10(String skill10) {
        this.skill10 = skill10;
    }

    public String getSkill11() {
        return this.skill11;
    }

    public void setSkill11(String skill11) {
        this.skill11 = skill11;
    }

    public String getSkill12() {
        return this.skill12;
    }

    public void setSkill12(String skill12) {
        this.skill12 = skill12;
    }

    public String getSkill13() {
        return this.skill13;
    }

    public void setSkill13(String skill13) {
        this.skill13 = skill13;
    }

    public String getSkill14() {
        return this.skill14;
    }

    public void setSkill14(String skill14) {
        this.skill14 = skill14;
    }

    public String getSkill15() {
        return this.skill15;
    }

    public void setSkill15(String skill15) {
        this.skill15 = skill15;
    }
    @Override
    public String toString() {
        return "{" +
                " intentGroup='" + getIntent_group() + "'" +
                ", segmentCode='" + getSegment_code() + "'" +
                ", queueName='" + getQueuename() + "'" +
                ", skill1='" + getSkill1() + "'" +
                ", skill2='" + getSkill2() + "'" +
                ", skill3='" + getSkill3() + "'" +
                ", skill4='" + getSkill4() + "'" +
                ", skill5='" + getSkill5() + "'" +
                ", skill6='" + getSkill6() + "'" +
                ", skill7='" + getSkill7() + "'" +
                ", skill8='" + getSkill8() + "'" +
                ", skill9='" + getSkill9() + "'" +
                ", skill10='" + getSkill10() + "'" +
                ", skill11='" + getSkill11() + "'" +
                ", skill12='" + getSkill12() + "'" +
                ", skill13='" + getSkill13() + "'" +
                ", skill14='" + getSkill14() + "'" +
                ", skill15='" + getSkill15() + "'" +
                "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof GenesysRoutingTable)) {
            return false;
        }
        GenesysRoutingTable genesysRoutingTable = (GenesysRoutingTable) o;
        return Objects.equals(intent_group, genesysRoutingTable.intent_group)
                && Objects.equals(segment_code, genesysRoutingTable.segment_code)
                && Objects.equals(queuename, genesysRoutingTable.queuename)
                && Objects.equals(skill1, genesysRoutingTable.skill1)
                && Objects.equals(skill2, genesysRoutingTable.skill2)
                && Objects.equals(skill3, genesysRoutingTable.skill3)
                && Objects.equals(skill4, genesysRoutingTable.skill4)
                && Objects.equals(skill5, genesysRoutingTable.skill5)
                && Objects.equals(skill6, genesysRoutingTable.skill6)
                && Objects.equals(skill7, genesysRoutingTable.skill7)
                && Objects.equals(skill8, genesysRoutingTable.skill8)
                && Objects.equals(skill9, genesysRoutingTable.skill9)
                && Objects.equals(skill10, genesysRoutingTable.skill10)
                && Objects.equals(skill11, genesysRoutingTable.skill11)
                && Objects.equals(skill12, genesysRoutingTable.skill12)
                && Objects.equals(skill13, genesysRoutingTable.skill13)
                && Objects.equals(skill14, genesysRoutingTable.skill14)
                && Objects.equals(skill15, genesysRoutingTable.skill15);
    }

    @Override
    public int hashCode() {
        return Objects.hash(intent_group, segment_code, queuename, skill1, skill2, skill3, skill4, skill5, skill6, skill7,
                skill8, skill9, skill10, skill11, skill12, skill13, skill14, skill15);
    }

}
