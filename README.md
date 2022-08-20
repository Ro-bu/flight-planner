# react-flight-planner

Solo project to create a space flight planner. I was given an app description, an API key, and possible routes between planets.

## Getting started

```
git clone https://github.com/Ro-bu/flight-planner.git
cd flight-planner
npm install
npm start
```

## Objectives & Outcomes

The main goal for this project was to create a flight planner app that fetches data and processes it to provide the user with a possible flight route between selected planets. There needed to be a filter possibility for the possible routes and a booking system.

The last 15 pricelists and all the bookings for those lists are stored in localStorage.

Beyond that, other learning outcomes were:

- How to use react-select
- Graphs and DFS
- First time using data that needs this much processing

## Biggest hurdles

I had never used Graphs nor heard of DFS or BFS before, so finding all the possible routes was a challenge.

Creating possible flight patterns from the routes was also a challenge, as I had never used data before that needs that amount of processing before passed to components.

## Possible improvements

I created the minimum viable product based on the task description with a few added features but in order to make the app user friendly I suggest the following improvements:

- A button to switch from and to locations
- Multichoice company filter
- Ability to use other filters while the company filter is applied
- Ascending and descending filters
- A more compact mobile design
- Styled select components
- Pagination for search results
- Control for duplicates in booked flights
- Take bookings in a modal or another page
- Edit/remove booked flights
- Animation for moving parts

### Javascript Framework

- [React](https://github.com/facebook/create-react-app)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [react-select](https://react-select.com/)