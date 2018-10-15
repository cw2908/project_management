# Design Choices

## Stack
- Boilerpate from *create-react-app* chosen to demonstrate experience with modern technology. Use popular open source projects where possible.
React apps do not necessarily require back end, can be deployed easily on different platforms, provides lots of options for future enhancements and will work on the vast majority of browsers.
- Tests with jest


## Design Choices

Use browser memory for app data if no database requirement. If requirements included user login, database, or API I would probably use a Rails stack because I am most familiar with this, but it is important not to over-engineer. Local storage in the browser could also be implemented to persist data between sessions.

