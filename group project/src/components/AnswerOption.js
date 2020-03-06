import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props){
    return (
        <li classname ="answerOption">
            <input
                type="radio"
                classname ="radioCustomButton"
                name="radioGroup"
                check={props.answerType === props.answer}
                id={props.answerType}
                value={props.answerType}
                disabled={props.answer}
                onchange={props.onAnswerSelected}
            />
            <label classname = "radioCustomLabel" htmlfor={props.answerType}>
                {props.answerContent}
            </label>
        </li>
    );
}

AnswerOption.propTypes ={
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;