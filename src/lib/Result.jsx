import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';

class Result extends Component {
  constructor(props){
    super(props);
    this.state = {
      score : 0,
      percentageScore : 0
    }
  }

  componentDidMount(){
    const {score, percentageScore} = this.state;
    const {correctAns, answers} = this.props;
    let tmpScore = score;
    answers.map((answer,index)=>{
        if(answer == correctAns[index]){
          tmpScore = tmpScore + 1;
        }
        return this.setState({
          score: tmpScore,
          percentageScore: (tmpScore/this.props.questions.length)*100
        })
    }) 
  }

  render() {
    const {score, percentageScore} = this.state;
    const {questions, answers, correctAns} = this.props;
  
    const renderQuestion =
      questions.map((question, index)=>{
            return (
            <div className="result-question" key={index}>
              <div className="row">
                <div className="col-12 col">
                  <Question currentQuestion={question}/>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col">
                  <Answer questionType={question.questionType} answers={question.answers} userAnswers={answers} renderInResult={true} correctAns={correctAns} qIdx={index}/>
                </div>
              </div>
            </div>
            )
          })

    const renderResult = 
          <div>
           <h1> Your score: <span className="badge secondary">{score}/{questions.length}</span></h1>
          </div>
    const scoreMsg = console.log('Your score was ' + percentageScore + ' percent');

 
    return (
      <div className="result-container">
          {renderResult}
          {renderQuestion}
          {scoreMsg}
      </div>
    );
  }
}

Result.propTypes = {
  correctAns: PropTypes.array,
  answers: PropTypes.array,
  questions: PropTypes.array
};

export default Result;
