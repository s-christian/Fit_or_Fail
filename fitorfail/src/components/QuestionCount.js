import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
    return (
        <div classname = "questionCount">
            Question <span>{props.counter}</span> of <span> {props.total}</span>
        </div>
    );
}

QuestionCount.propTypes = {
    coutner: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default QuestionCount;