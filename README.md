# octopus-prehire-test

## Test definition

* Create web application in Angular for displaying currencies and rates.

## Application definition
  * It is separated into list and detail parts.
  * List displays currencies. Each currency is represented by currency code and country name.
  * List can be filtered by fulltext search applied in currency code and country name. Fulltext is case insensitive and ignores diacritic.
  * List is sorted alphabetically from A to Z by country name.
  * Detail is displayed on click in currency list item. It is opened to the right from the list.
  * Detail shows currency code, country name, average rate to CZK counted from last 12 months and line chart with rates to CZK for last 12 months.

## Implementation specification
  * Use typescript as a programming language.
  * List of currencies is in `data/currencies.json` file.
  * Rates to CZK for last 12 months are in `data/[currencyCode].json`, ie. `data/eur.json`.
  * `data/sek.json` file is missing. Application should cover this situation and display an error message on SEK currency list item click.
  * Do not modify any file in `data` folder. You can move the folder whenever you want if it is necessary for implementation.
  * Content from files in `data` folder must be retrieved by HTTP communication. Do not include them directly into your code.
  * Url in browser should be changed dynamically when detail is opened.
  * Show some kind of loading indication to end user before the data for list or details are received.
  * Use OnPush change detection strategy when you implement the application in Angular.

## Development process
* Clone this project
* Implement the application based on the definition.
* After you are fine with your implementation, create a build for **production** use.
* Commit and push your work back to the forked repository
* Send us email that you finished the test
****

# Getting Started with Create React App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
