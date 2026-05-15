# Overview
This is a very simple intelligent tutoring system designed to test a users knowledge on React Components and useState.
It will give feedback after answering a question and at the end of each quiz. 
This ITS utilizes Bayesian Knowledge Tracing to track a student's knowledge of a particular topic over time.

# Features & Concepts
## Basic
- 3 categories of topics: ```Basics of React Components → Basics of useState → Calling the useState Hook```
  - Categories are locked until you complete the previous category (Starting at Basics of React Components)
- 13 knowledge components spread across all the 3 categories
- 5 questions per knowledge component
  - *Note: While the question structure was created by me, the actual questions & feedback was generated using chatGPT*
- Feeback given after each answer and at then end of a quiz

## Data Model
### Category
```ts
interface Category {
  id: string;
  title: string;
  unlocked: boolean;
  none: Set<string>;
  adequate: Set<string>;
  excellent: Set<string>;
}
```
### Knowledge Component
```ts
interface KnowledgeComponent {
  id: string;
  name: string;
  pKnown: number;
  pWillLearn: number;
  knowledgeLevel: string;
}
```
### Question

```ts
interface Option {
  text: string;
  feedback: string;
  isCorrect: boolean;
}

interface QuestionType {
  id: string;
  kcId: string;
  question: string;
  options: { [key: string]: Option };
  pSlip: number;
  pGuess: number;
}
```
### Quiz

```ts
interface Quiz {
  id: number;
  kcId: string;
  categoryId: string;
  questions: QuestionType[];
  qaPairs: Map<string, string>;
}
```

## Knowledge Tracing
Each category has 3 sets for tracking their corresponding knowledge components.
- ```none``` Knowledge components where the user has no understanding
- ```adequate``` Knowledge components where the user has adequate understanding
- ```excellent``` Knowledge components where the user has excellent understanding

These sets represent the 3 knowledge levels that a knowledge component can be set to.
Using Bayesian Knowledge Tracing, a knowledge component's ```pKnown``` value will be updated after answering a question that pertains to that knowledge component.
After a user finishes their current quiz, the ITS will update the knowledge component's current knowledge level (i.e. move it to one of the sets defined above)
\
\
The thresholds for moving a knowledge component are defined as follows:
- ```pKnown < 75%``` No understanding
- ```75% <= pKnown < 90%``` Adequate understanding
- ```pKnown >= 90%``` Excellent understanding

A user cannot move onto another knowledge component if they are at no understanding by the end of the quiz. So a user must acheive a knowledge level of adequateor higher in order to move on.
After a user finishes going through every knowledge component in the category, they will unlock the next category if the number of knowledge components at the excellent level is greater than the number of knowledge components at the adequate level
\
\
Basically, it has to meet the following condition: 
```ts 
(category.excellent.size > category.adequate.size) && (category.none.size === 0)
```

## Quiz Generation
### Knowledge Component Selection
The ITS will grab a random knowledge component that the user has no understanding of (i.e. from the current categroies ```none``` set).
If the student has at least adequate understanding on all knowledge components in the category and not enough excellents, then it will select a random knowledge component where the student has adequate understanding (i.e. from the current categroies ```adequate``` set)

### Question Selection
After selecting a knowledge component, it will then grab 4 random questions that relate to the knowledge component.

# Important Files
- ```/src/utils/helpers``` [Helpers](https://github.com/TheLuckyman30/its-prototype/tree/main/src/utils/helpers) Contains the core functionality of the app, including: quiz generation, knowledge tracing algorithm, updating knowledge levels, generating end of quiz feedback, and a few small helper functions
- ```/src/utils/helpers/knowledge-tracing``` [Knowledge Tracing](https://github.com/TheLuckyman30/its-prototype/blob/main/src/utils/helpers/knowledge-tracing.ts) This file contains the implementation of BKT
- ```/src/utils/zustand``` [Zustand Stores](https://github.com/TheLuckyman30/its-prototype/tree/main/src/utils/zustand) Contains various zustand stores for managing state related to the current user, current quiz, and the current page. 
- ```/src/utils/interfaces``` [Interfaces](https://github.com/TheLuckyman30/its-prototype/tree/main/src/utils/interfaces) Contains various interfaces to provide type support throughout the codebase
- ```/src/data``` [Data](https://github.com/TheLuckyman30/its-prototype/tree/main/src/data) Contains all of the data that the ITS uses (questions, categories, knowledge components)
