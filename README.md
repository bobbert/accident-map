# Maryland Accident Map

A simple map-based visualization of crash data for Maryland from October 2016 through December 2016, written in Angular.

## Installation and Usage:

* Load Node.js packages by running `npm install` from the root directory.
* Download `Crash_Qtr04_2016.xlsx` from the data.maryland.gov URL below and place in `/data` directory.
* Open Excel document, and save first four worksheets (Crash, EMS, Person, Vehicle) each to a
  separate CSV file in the same data directory: `Crash_Qtr04_2016.csv`, `EMS_Qtr04_2016.csv`,
  `Person_Qtr04_2016.csv`, and `Vehicle_Qtr04_2016.csv`.

### Development server

  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

  Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

  To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Data Source:

  Maryland.gov Open Data Portal

  Maryland Statewide Vehicle Crashes: CY2016 Quarter 4

  https://data.maryland.gov/Public-Safety/Maryland-Statewide-Vehicle-Crashes-CY2016-Quarter-/276v-wfg2
