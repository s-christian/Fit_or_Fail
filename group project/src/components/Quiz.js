import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from "../components/QuestionCount";
import AnswerOption from "../components/AnswerOption";


function Quiz(props) {
    function renderAnswerOptions(key) {
        return (
            <AnswerOption key={key.content} answerType={key.type} answerContent={key.content}
                          answer={props.answer} questionId={props.questionId}
                          onAnswerSelected={props.onAnswerSelected}/>
        );
    }
    return (
        <div classname = "Quiz">
            <QuestionCount coutner={props.questionID} total={props.questionTotal}/>
            <Question content={props.question}/>
            <ul classname="answerOptions">
                {props.answerOptions.map(renderAnswerOptions)}
            </ul>
        </div>
    )
}

Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal:PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;