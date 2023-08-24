import { Question } from "./question.js";
import { Quiz } from "./quiz.js";

// todo:====> Html Elements
let categoryMenu = document.getElementById("categoryMenu");
let difficultyOptions = document.getElementById("difficultyOptions");
let questionsNumber = document.getElementById("questionsNumber");
let startQuiz = document.getElementById("startQuiz");
let formQiestion = document.getElementById("quizOptions");
export let questionContainer = document.querySelector(".questions-container");

// todo: app variables
export let questions;
export let quiz;
// todo:====> Events

startQuiz.addEventListener("click", async () => {
  const category = categoryMenu.value;
  const difficulty = difficultyOptions.value;
  const numberOfQuestions = questionsNumber.value;

  quiz = new Quiz(category, difficulty, numberOfQuestions);
  questions = await quiz.getdata();
  let question = new Question(0);
  formQiestion.classList.replace("d-flex", "d-none");
  question.displayQuestions();
});
