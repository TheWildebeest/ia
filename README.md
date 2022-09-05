# Interactive advisors tech test

### Applicant:

David Wildman

### Spec:

Make a page, single page app or series of pages that you feel best displays the data to a potential user.

### Running the project locally
#### *Requirements: Node, Npm, Angular CLI*
#### **Instructions**:

- Open a terminal
- Execute `git clone https://github.com/TheWildebeest/ia.git` to make a copy of the repository locally.
- Execute `ls` to confirm the folder 'data-visualisation' exists.
- Execute `cd ia` to move into the project directory.
- Execute `npm install` to install all project dependencies.
- Once finished, use the angular command `ng serve` to boot up a local dev server.
- Navigate to http://localhost:4200/ in your browser.
- Any problems, drop me a line: david.m.wildman@gmail.com

#### **Packages used**:
- **D3** to render chart data
- **Bootstrap** for quick and easy UI setup

#### **Things I would have done if I'd had more time**:
- **Finish the chart**:
  - add axis labels
  - add some nicer styling
  - use nicer fonts
  - add entry animation on the graph
  - add a loading placeholder for the graph to prevent layout jank
- **Add NGRX**:
  - Create a store
  - Dispatch a 'Dashboard loaded' event
  - Add an effect to listen to actions of type 'Dashboard loaded' and fetch the dashboard data
  - DataService could then be moved to store and any data processing moved into reducer or done in the effect

---
#### **Schema**:
|Api data     ||
|---|---|
|data|`Post[]`|
---
|*type `Post`*     ||
|---|---|
|title|`string`|
|subTitle|`string`|
|date|`string` (YYYY-DD-MM)|
|url|`string`|
|description|`string`|
|chart|`ChartXY[]`|
---
|*type `ChartXY`*||
|---|---|
|x|`number` (UNIX timestamp)|
|y|`number` (2-digit integer)|
---
##### **Notes**:

- This is an Angular project — see [official Angular documentation](https://angular.io/) for more info.

