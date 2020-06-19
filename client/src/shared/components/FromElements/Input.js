import React, { useReducer, useEffect } from "react";
import "./Input.css";
import { validate } from "../../util/validators";


const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid) //this will run when
    }, [id, value, isValid, onInput]); //any of this will change

    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = (event) => {
        dispatch({
            type: "TOUCH"
        });
    };

    //har input box k lia alag call hoga ye <INPUT/> method
    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
                <textarea
                    id={props.id}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                />
            );

    return (
        // ye wo chzn hain jo jahan use krogy wahan s props s paass krani hain
        <div
            className={`form-controll ${
                !inputState.isValid && inputState.isTouched && "form-control--invalid"
                }`}
        >
            <label htmlFor={props.id}> {props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};
export default Input;
