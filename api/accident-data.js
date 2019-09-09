'use strict';

const DATA_CSV_FILES = [
  ['crash',   'Crash_Qtr04_2016.csv'],
  ['ems',     'EMS_Qtr04_2016.csv'],
  ['person',  'Person_Qtr04_2016.csv'],
  ['vehicle', 'Vehicle_Qtr04_2016.csv']
];
const SIMPLE_DATA_CSV_FILES = [
  ['crash',   'Crash_Qtr04_2016.csv'],
  ['vehicle', 'Vehicle_Qtr04_2016.csv']
];

const fs    = require('fs');
const parse = require('csv-parse/lib/sync');
const _     = require('lodash');

function zeroPadDateString(dateString) {
  let matchData = dateString.match(/^([0-9][0-9]?)\/([0-9][0-9]?)\/([0-9][0-9])$/) || [];
  if ((matchData[1].length === 2) && (matchData[2].length === 2)) {
    return dateString;
  }
  else if (matchData) {
    let month = ((matchData[1].length < 2) ? "0" : "") + matchData[1];
    let day   = ((matchData[2].length < 2) ? "0" : "") + matchData[2];
    return `${month}/${day}/${matchData[3]}`;
  }
  return null;
}

// Reads and parses JSON data from data.maryland.gov.
// Fields:
// * metadata - information about the data set (description, date updated, etc.)
// * formattedData - an array of objects, where each object contains information
//      for one accident
function AccidentData() {

  var rawData = {};

  // Read raw data from CSV files.
  // Example of CSV data fields read in:
  // 1. Crash data set:
  // {"LIGHT_CODE":"1","COUNTY_NO":"1","MUNI_CODE":"41","JUNCTION_CODE":"1","COLLISION_TYPE_CODE":"7",
  //  "SURF_COND_CODE":"2","LANE_CODE":"1","RD_COND_CODE":"1","RD_DIV_CODE":"4","FIX_OBJ_CODE":"0",
  //  "REPORT_NO":"MSP2951001T","REPORT_TYPE":"Property Damage Crash","WEATHER_CODE":"6.01",
  //  "ACC_DATE":"12/3/16","ACC_TIME":"9:41:00","LOC_CODE":"NA","SIGNAL_FLAG":"N","C_M_ZONE_FLAG":"N",
  //  "AGENCY_CODE":"MSP","AREA_CODE":"UNK","HARM_EVENT_CODE1":"1","HARM_EVENT_CODE2":"0","RTE_NO":"68",
  //  "ROUTE_TYPE_CODE":"IS","RTE_SUFFIX":"","LOG_MILE":"15.39","LOGMILE_DIR_FLAG":"E",
  //  "MAINROAD_NAME":"NATIONAL FREEWAY","DISTANCE":"","FEET_MILES_FLAG":"F","DISTANCE_DIR_FLAG":"E",
  //  "REFERENCE_NO":"0","REFERENCE_TYPE_CODE":"UU","REFERENCE_SUFFIX":"","REFERENCE_ROAD_NAME":"EXIT #47",
  //  "LATITUDE":"39.67023167","LONGITUDE":"-78.70608183"}
  // 2. EMS data set (currently not used):
  // {"REPORT_NO":"AE5587000J","EMS_UNIT_TAKEN_BY":"MEDIC 2","EMS_UNIT_TAKEN_TO":"SINAI HOSPITAL",
  //  "EMS_UNIT_LABEL":"A","EMS_TRANSPORT_TYPE":"G"}
  // 3. Person data set (currently not used):
  // {"SEX_CODE":"F","CONDITION_CODE":"0","INJ_SEVER_CODE":"1","REPORT_NO":"AA0106000H",
  //  "OCC_SEAT_POS_CODE":"","PED_VISIBLE_CODE":"","PED_LOCATION_CODE":"","PED_OBEY_CODE":"",
  //  "PED_TYPE_CODE":"","MOVEMENT_CODE":"","PERSON_TYPE":"D","ALCOHOL_TEST_CODE":"0",
  //  "ALCOHOL_TESTTYPE_CODE":"","DRUG_TEST_CODE":"0","DRUG_TESTRESULT_CODE":"","BAC_CODE":"",
  //  "FAULT_FLAG":"Y","EQUIP_PROB_CODE":"1","SAF_EQUIP_CODE":"13","EJECT_CODE":"1","AIRBAG_DEPLOYED":"2",
  //  "DATE_OF_BIRTH":"20-Jan-80","PERSON_ID":"fa2da4ee-e4cf-4603-838d-785ca522637c",
  //  "LICENSE_STATE_CODE":"MD","CLASS":"","CDL_FLAG":"N","VEHICLE_ID":"0131959c-9d0a-4aa8-b7c9-18ce00948d9a",
  //  "EMS_UNIT_LABEL":""}
  // 4. Vehicle data set:
  // {"HARM_EVENT_CODE":"1","CONTI_DIRECTION_CODE":"S","DAMAGE_CODE":"3","MOVEMENT_CODE":"3",
  //  "VIN_NO":"JF1ZNAA16G9708951","REPORT_NO":"DD5601002B","CV_BODY_TYPE_CODE":"","VEH_YEAR":"2016",
  //  "VEH_MAKE":"SCION","COMMERCIAL_FLAG":"N","VEH_MODEL":"FRS","HZM_NUM":"","TOWED_AWAY_FLAG":"N",
  //  "NUM_AXLES":"","GVW_CODE":"","GOING_DIRECTION_CODE":"S","BODY_TYPE_CODE":"2","DRIVERLESS_FLAG":"N",
  //  "FIRE_FLAG":"","PARKED_FLAG":"N","SPEED_LIMIT":"15","HIT_AND_RUN_FLAG":"N","HAZMAT_SPILL_FLAG":"",
  //  "VEHICLE_ID":"00001087-13c7-4ac7-b54f-46480b03d329","TOWED_VEHICLE_CONFIG_CODE":"0",
  //  "AREA_DAMAGED_CODE_IMP1":"1","AREA_DAMAGED_CODE1":"1","AREA_DAMAGED_CODE2":"2",
  //  "AREA_DAMAGED_CODE3":"","AREA_DAMAGED_CODE_MAIN":"1"}
  //
  // Storing raw data in format above as objects with "REPORT_NO" field as key.
  // The "REPORT_NO" field must be present in all data set records.
  _.each(SIMPLE_DATA_CSV_FILES, (fileArr, key) => {
    let fileData = fs.readFileSync('data/' + fileArr[1]);
    let records = parse(fileData, {columns: true});
    rawData[fileArr[0]] = {};
    _.reduce(records, (obj, record) => {
        obj[record["REPORT_NO"]] = record;
        return obj;
      },
      rawData[fileArr[0]]
    );
    console.log(`Read ${_.keys(rawData[fileArr[0]]).length} records from data set ${fileArr[0]}.`);
  });

  this.rawData = rawData;

  this.simpleData = _(this.rawData.crash)
    .keys()
    .map(reportNumber => {
      let crashDataRow   = rawData.crash[reportNumber];
      let vehicleDataRow = rawData.vehicle[reportNumber];

      let id       = crashDataRow["REPORT_NO"];
      let date     = zeroPadDateString(crashDataRow["ACC_DATE"]);
      let time     = crashDataRow["ACC_TIME"];
      let reportType  = crashDataRow["REPORT_TYPE"];
      let roadName = crashDataRow["MAINROAD_NAME"];
      let agencyName = crashDataRow["AGENCY_CODE"];
      let lat      = crashDataRow["LATITUDE"];
      let lng      = crashDataRow["LONGITUDE"];
      let year     = (vehicleDataRow == null) ? "" : vehicleDataRow["VEH_YEAR"];
      let make     = (vehicleDataRow == null) ? "" : vehicleDataRow["VEH_MAKE"];
      let model    = (vehicleDataRow == null) ? "" : vehicleDataRow["VEH_MODEL"];

      return {
        id,
        date,
        time,
        reportType,
        roadName,
        agencyName,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        year,
        make,
        model
      };
    })
    .value();

}

module.exports = AccidentData;
