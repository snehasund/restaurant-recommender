# PickMe
## What is PickMe?
PickMe helps individuals make decisions through the use of machine learning to choose between several preferred options.

1. Users input their preferences for each cuisine
2. When they want to make a decision, they are presented with a series of options and vote yes or no to each
3. The model then chooses 1 option and returns it to the user

For more details, view the full project proposal [here](https://docs.google.com/document/d/1DWap-9ALAZtj3AYx4V9Xo7TwfyXfd8iRc8ZHxXT7qjc).

## Technical Architecture 
<img width="902" alt="Screenshot 2024-05-07 at 7 09 55 PM" src="https://github.com/CS222-UIUC-SP24/group-project-team-34/assets/113861384/b193c1ac-c8aa-4856-9985-80408e51ee04">

## Developers
- Lauren Hyde: Frontend and design
- Evan Lin: Backend API, authentication and database
- Sneha Sundar: Kmeans clustering to make decisions
- David Han: Backend

## To run the project:
Run `npm i` to install the needed modules

To run the frontend: `npm run dev`

To run the backend: `python3 backend/app.py`

To run the test suite: `npm test "keyword"` (runs tests with "keyword" in the title)
