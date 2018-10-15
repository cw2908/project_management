# Instructions
1. Clone repo
2. `yarn`
3. `yarn start`
4. visit `http://localhost:3000`

# Design

### Live Example
https://chris-pm-tool.herokuapp.com/

## Stack
- Boilerpate from *create-react-app* chosen to demonstrate experience with modern technology. 
- Use popular open source projects where possible.
- React apps do not necessarily require back end, can be deployed easily on different platforms (including native mobile apps), provides lots of options for future enhancements and will work on the vast majority of browsers. 
- Tests implemented through jest `yarn test`


## Implementation Choices

- Uses browser memory for app data because no requirement.
- Could use Rails but no user login / session, API or backend requirements - do not over-engineer
- Local storage in the browser could also be implemented to persist some data between sessions.


#### Notes

Example project sets from requirements available in `App.js` as `initialProps`


#### Potential Improvements
- Could improve UX given more requirements
- Should improve business logic if project sets could include high number of projects