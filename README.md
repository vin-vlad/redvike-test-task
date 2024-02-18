# Redvike test task

## Prerequisites

- NodeJS v16.17.0+

## Installation

* clone repository
* navigate to repository folder
* open a terminal in the cloned repository folder and type:

      npm install
		 
## Running tests

After successful installation you can run specs by running to open cypress dashboard:

      npx cypress open
    
## List of covered test cases

* Submit form with valid data and avatar
* Submit form with valid data and no avatar
* Submit form with invalid data
* Verify capcha slider
* Verify invalid avatar image - EXPECTED TO FAIL
* Verify valid avatar image

Verification of avatar image is done with help of `cypress-visual-regression` package. It compares previously generated base image snapshot to actual image located on webpage. Difference in images stored in `cypress\snapshots\diff` folder