# Maryland Accident Map

A simple map-based visualization of crash data for Maryland from October 2016 through December 2016.

## Installation and Usage:

* Load Node.js packages by running `npm install` from the root directory.
* Download `Crash_Qtr04_2016.xlsx` from the data.maryland.gov URL below and place in `/data` directory.
* Open Excel document, and save first four worksheets (Crash, EMS, Person, Vehicle) each to a
  separate CSV file in the same data directory: `Crash_Qtr04_2016.csv`, `EMS_Qtr04_2016.csv`,
  `Person_Qtr04_2016.csv`, and `Vehicle_Qtr04_2016.csv`.
* Start the app by running `npm start`.  The app should correctly parse the CSV files and write
  log statements indicating how many data records were read in.  Then point your browser to
  localhost:3000 and the map should appear with lots of data points.

## Data Source:

  Maryland.gov Open Data Portal

  Maryland Statewide Vehicle Crashes: CY2016 Quarter 4

  https://data.maryland.gov/Public-Safety/Maryland-Statewide-Vehicle-Crashes-CY2016-Quarter-/276v-wfg2
