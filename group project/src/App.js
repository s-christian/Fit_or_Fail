import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
        this.shuffleArray(question.answers));
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  function

  swap(ci, ri) {
    var temporaryValue = array[ci];
    array[ci] = array[ri];
    array[ri] = temporaryValue;
    return ci, ri;
  }

  shuffleArray(array) {
    var currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {


      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      swap(currentIndex, randomIndex);
    }
    return array;
  };




  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if(this.state.questionId <quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    }else{

    }
  }
  setUserAnswer(answer) {
    this.setState((state)=> ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer]|| 0) +1
      },
      answer: answer
    }));
  }
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
        <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
        />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }
  render() {
  return(
      <div className="App">
        <div className="App-header">
        <img src={logo} className ="App-logo" alt ="logo"/>
        <h2>Fit-Or-Fail</h2>
        </div>
      </div>
   );
  }
}
export default App;
