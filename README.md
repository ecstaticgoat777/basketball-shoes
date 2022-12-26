# Development

### Link to Deployed Website
`https://faizaanvidhani.github.io/sneaker-central

### Goal and Value of the Application
This application serves to help users find their favorite shoes by providing mechanisms for sorting (by rating and price) and filtering (by gender, brand, sport, and color).

### Usability Principles Considered
To create a visual hierarchy, the title is in a big font size and the text of the cards is in a small font size. The shoe cards are uniform in appearance to create a sense of cohesiveness. The buttons have a dark background to enhance readability. Selected items are highlighted in a yellow color to align with the mental model of users (items are typically highlighted in yellow). 

### Organization of Components
There is a ShoeItem component that compiles the information for a shoe and organizes it in a card. The FilterCategory component that houses FilterItem components. For example, the FilterCategory component for Gender houses FilterItem components for Male, Female, and Unisex (visually displayed as checkboxes). The Aggregator component houses the FavoritesList component and the Total component. The App component is the top-most component that houses these components and the Sort component.

### How Data is Passed Down Through Components
Data is passed down via props. Each component can consume variables, which can be accessed in the child component. For example, the information corresponding to a shoe item (brand, gender, sport, color, image) is passed down via props from the App component to the ShoeItem component. The FavoritesList component consumes the state variable 'favs' in App and creates a list of entries corresponding each favorite in the list of favorites.

### How the User Triggers State Changes
The user triggers state changes when clicking the radio button when sorting or the checkboxes when filtering. This causes filtering/sorting to take place behind the scenes, which updates the state variables for filters, sortType, items, total, favs, etc. State variables like total and favs are passed down via props. State is also used for the list of shoe items.

