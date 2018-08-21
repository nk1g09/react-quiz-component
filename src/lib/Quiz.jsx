import React, { Component } from 'react';
import Question from './Question';
import Answer from './Answer';
import Result from './Result';
import PropTypes from 'prop-types';
import "./styles.css";

class Quiz extends Component {
  constructor(props){
    super(props);
    let quiz = this.props.quiz;
    this.state = {
      step: 0,
      title: quiz.quizTitle,
      description: quiz.quizDescription,
      questions: quiz.questions,
      currentQuestion: quiz.questions[0],
      answers: [],
      correctAns: [],
      totalQuestions: quiz.questions.length,
      endQuiz: false,
      showResult: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.parseCorrectAnswer();
  }

  parseCorrectAnswer(){
    const {correctAns, questions} = this.state;
    questions.map(question=>{
      return correctAns.push(question.correctAnswer);
    })
  }


   handleClick = (index) => {
   console.log(index);
	    const { step, questions, answers, totalQuestions } = this.state;
	    answers.push((index+1));
	    let updatedStep = step;

	    if(step < totalQuestions - 1){
	       updatedStep = step + 1;
	        this.setState({
	        step: updatedStep,
	        currentQuestion: questions[updatedStep],
	      })
	    }else{
	      this.setState({
	        endQuiz: true
	      })
	    } 
	 }

  render() {
    const {title, description, questions, currentQuestion, answers, correctAns, endQuiz, totalQuestions, step} = this.state;
    return (
      <div className="react-quiz-container">
        <h2>{title}</h2>
        <p>{description}</p>
        { endQuiz===true? (
          <Result questions={questions} answers={answers} correctAns={correctAns}/>
        ): (
          <div>
            <div className="progress"><p>Question {step+1} of {totalQuestions}</p></div>
           <div className="row">
            <div className="col-12 col">
             <Question currentQuestion={currentQuestion} />
             </div>
           </div>
           <div className="row">
           <div className="col-12 col">
             <Answer questionType={currentQuestion.questionType} answers={currentQuestion.answers} handleClick={this.handleClick} renderInResult={false}/>
             </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Quiz.propTypes = {
  quiz: PropTypes.object
};

export default Quiz;
