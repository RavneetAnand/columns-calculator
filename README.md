# Opvia Take-home Product Challenge

Scientists are automatically uploading their data from bioreactors into Opvia. The scientists wanted to calculate the cell count at any point in time, as well as being able to see the maximum cell count.

Instead of building in these features, we have identified two higher level features to build which would solve their problem, and would be useful to all of our customers:

1. `Calculation columns`, these are columns in the table that are populated based on a user defined formula e.g. A cell count column that is created by the formula: `Cell Density * Volume`
2.  A `Column Aggregations` feature which allows a user to perform operations on a selected data column, such as showing the `Maximum Density`, `Minimum Cell Count`, etc...

This project will serve as a PoC for the scientists to use and demonstrate these featueres and have their feedback.

## Features

- **Data Table Display**: A main page feature displaying sample data in a table format.
- **Left Slider Panel**: Contains two main functionalities:
  - **Add Calculated Columns Panel**: Enables the addition of calculated columns to the data table.
  - **Choose Aggregate Functions**: Users can select aggregate functions by columns for data manipulation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To install the software, you will need the following:

- Node.js and npm: You can install the latest version of npm globally by running the command `npm install npm@latest -g`. You can install Node.js using nvm (Node Version Manager) by running `nvm install v20`.

### Installation

Once you have the prerequisites installed, follow these steps to install the project:

1. Clone the repository: `git clone https://github.com/RavneetAnand/columns-calculator.git`
2. Install the required npm packages: `npm install`
3. Start the project: `npm start`

## Usage

**Table**:

The main page features a table that displays sample data provided by the scientists, along with the corresponding column names. Here are some key features of the table:

1. Every column header has a caret-down button that will open up a menu, providing these options:
  a. Sort ascending: Sorts the table in ascending order of the column.
  b. Sort descending: Sorts the table in descending order of the column.
  c. Functions: Opens a list of aggregate functions to apply on the column.
2. Every column can be expanded to see the full column name or data.
3. All the calculated columns will have an extra bin button in grey, allowing users to delete their calculated columns.
4. Possibility to scroll down all the data keeping the header comun row intact.

**Toolbar panel**:

Then on the left side of the main page there's a toolbar which contains two buttons:
1. Add Calculated Columns
2. Manage Aggregate Functions

**Add Calculated Columns**: Clicking on this button will open a slider panel containing a formula-builder form that
provides the following options:
  a. Field to add a column name
  b. List of column names in the table
  c. Numbers and basic arithmetic operators

**Note:** The `time` datatype column will not be included in this panel at the moment.

You can enter any desired name for your column.

The column names, numbers, and arithmetic operators are provided as buttons that you can click to add to your formula. There is also a `Validate form` button that checks the entered formula against several validation rules before allowing evaluation. Some of these validation checks include:
1. Balanced parentheses
2. Valid operands (numbers or existing column names)
3. Consecutive operators (excluding parentheses)
4. Operator at the end of the expression

Once the formula passes these checks, clicking on the `Validate form` button will display a corresponding message and activate the `Add Column` button. Clicking on `Add Column` will evaluate the formula and perform the following actions:
1. If the formula is valid, a new column will be added to the right end of the table
2. If the formula is invalid, an error toaster message will appear and the column will not be added to the table

**Manage Aggregate Functions**: Clicking on this button will open a slider panel that provides the following options:
  a. A dropdown to select a column name from all the columns in the table
  b. List of checkboxes to choose which aggregate functions you want to see in a particular column's menu

The `time` data type column will have only 3 options to choose from applicable on a datetime field: 'COUNT', 'MAX', and 'MIN'

The rest of the `data` data type columns will have these options to choose from: 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'STDDEV', 'VARIANCE', and 'MEDIAN'

There are two buttons: `Clear` and `Submit`
Clicking on the `Clear` button will clear all the selected checkboxes.
Clicking on the `Submit` button will save the list of selected functions and display a confirmation message using a toaster.

## Future improvements

During the implementation of this project, the following future improvements have been identified:

1. Adding time data-type columns to the formula-builder form: This requires collaboration with the scientists to determine the desired formulas for time fields. This improvement is planned for the future.
2. Global state management technique: Currently, context is used for global state management in this small-scale app. However, it would be interesting to explore other global state management techniques in the future.
3. Adjustable column and table width: Currently, the width of the columns is fixed, resulting in excessive whitespace on the screen. A future improvement would be to initially display the columns at full width and allow for adjustment as more columns are added.
4. Use of styled components: While styled components are personally preferred for readability, it was not the best choice when working with blueprintjs custom classes. In the future, alternative approaches may be explored.
5. Writing tests with blueprintjs custom classes: The process of covering the blueprintjs custom classes in the tests took longer than expected. However, the menu popover tests could not be covered within the given timeframe. This task requires additional time and effort.
6. Memoization technique: To optimize performance, implementing memoization for expensive calculations in the components is planned for the future.

## Rate of change calculations

Taking into account the `Rate of Cell Count Growth`.

There are different ways of calculating the rate of change. Looking at the sample data provided, which includes two columns: `Time` and `Cell Density (Cell Count/Litre)`, we observe that `Cell Density (Cell Count/Litre)` varies (increases) over `Time`. To provide the possibility of calculating the `Rate of Cell Count Growth`, we can allow the users to select a particular set of rows and then providing a context-menu on the right click with the options to compute the `Rate of change` on the basis of those selected rows.

Further, this `Rate of change` can either be represented in a tabular-form or in a graphical-form based on a user's choice by applying a computed formula.


## Authors

* **Ravneet Singh Anand** - [RavneetAnand](https://github.com/RavneetAnand)
