# Interactive advisors tech test

#### **Applicant**:

David Wildman

#### **Spec**:

Make a page, single page app or series of pages that you feel best displays the data to a potential user.

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
|chart|`ChartXY`|
---
|*type `ChartXY`*||
|---|---|
|x|`number` (UNIX timestamp)|
|y|`number` (2-digit integer)|
---
##### **Notes**:

- This is an Angular project — see [official Angular documentation](https://angular.io/) for more info.

