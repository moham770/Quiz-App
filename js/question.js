import { questions, quiz, questionContainer } from "./index.js";

export class Question {
  constructor(index) {
    this.index = index;
    this.question = questions[index].question;
    this.correctAnswer = questions[index].correct_answer;
    this.WrongAnswers = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.difficulty = questions[index].difficulty;
    this.allAnswers = this.getChoicesReady();
    this.answerd = false
  }
  getChoicesReady() {
    return this.WrongAnswers.concat(this.correctAnswer).sort();
  }

  displayQuestions() {
    const questionMarkUp = `
            <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.allAnswers
          .map((answer) => {
            return `
            <li>${answer}</li>
            `;
          })
          .join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score:${
        quiz.score
      } 
       
       </h2>        
    </div>     
 `;
    questionContainer.innerHTML = questionMarkUp;
    let allAnswers = document.querySelectorAll(".question ul li");
    for (let i = 0; i < allAnswers.length; i++) {
      allAnswers[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
  }
  checkAnswer(e) {
    if(!this.answerd){
      this.answerd =true
      if (e.target.innerHTML.toLowerCase() == this.correctAnswer.toLowerCase()) {
        e.target.classList.add(
          "animate__animated",
          "correct",
          "animate__rubberBand"
        );
        quiz.score += 1;
      } else {
        e.target.classList.add("animate__animated", "wrong", "animate__shakeX");
      }
  
      this.animateQuestion(e.target, 500);
    }
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element.closest(".question").classList.replace("animate__bounceIn","animate__backOutRight");
      setTimeout(() => {
        this.nextQuestion()
      }, duration);
    },duration);
  }

  nextQuestion(){
    this.index += 1
    if(this.index > questions.length -1){
      questionContainer.innerHTML = quiz.endQuiz()
      let tryAgainBtn =document.querySelector('.again')
      tryAgainBtn.addEventListener('click',()=>{
        location.reload()
      })
      return;
    }
    const newQuestion =new Question(this.index)
    newQuestion.displayQuestions()
  }
}
