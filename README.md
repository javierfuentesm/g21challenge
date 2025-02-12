![The G2i Logo](https://raw.githubusercontent.com/g2i/code-challenge-static-assets/master/g2i-web-150px.png "The G2i logo")

# Trivia Game Coding Challenge

## Overview

Your challenge is to create a 10 question, true or false, trivia app in React Web. **You should not just implement the most basic solution. This is a chance to show off your abilities and impress.**

**The application code will be reviewed and scored on these key areas with many subset areas for each:**

- Functionality
- Code Format
- Project Structure
- Scalability
- Maintainability
- Use of industry best practices

Some specific things that we are looking for:

- Effective state management
- Navigation solution
- Componentization
- Best practices with API calls and data
- Separation of concerns between business and UI logic

## Goals

Implement the screens based off the wireframes, HTML/CSS starter code and api below using **advanced techniques** and **industry best practices** for your platform. Use your best judgment for UI/UX implementation. We have provided boilerplate code for a standard CRA project with Redux. In addition, we have given you some starter HTML and CSS in the designs folder. You can reference those as a starting place for your layout. We want to see how you structure the rest of the project and what tooling you use from here.

## Specifications

Layout:

See the designs folder for basic HTML and CSS already provided

Data:

The api url is: https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean

Sample returned json:

```javascript
{
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "hard",
      "question": "Unturned originally started as a Roblox game.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },…]}
```

### Intro / Home Screen:

![The Intro screen for the app](https://raw.githubusercontent.com/g2i/code-challenge-static-assets/master/Intro.png "The intro screen for the app")

- Static Text
- BEGIN button navigates to the Quiz screen and starts the Quiz

### Quiz Screen:

![The Quiz screen for the app](https://raw.githubusercontent.com/g2i/code-challenge-static-assets/master/Quiz.png "The quiz screen for the app")

- The headline is from question category
- The card element contains the current question
- The next question should appear after the current question is answered True or False
- After all questions have been answered, navigate to the Results Screen

### Results screen:

![The Results screen for the app](https://raw.githubusercontent.com/g2i/code-challenge-static-assets/master/Score.png "The score screen for the app")

- The Score shows correct and total
- Displays a list of the questions and whether the answer was correct or not
- PLAY AGAIN starts over and navigates to the Home Screen