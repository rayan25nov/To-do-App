import React, { useState, Fragment, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, SetEnteredUsername] = useState("");
  // const [enteredAge, SetEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non empty values)",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age(> 0)",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    // SetEnteredUsername("");
    // SetEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   SetEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   SetEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          ></input>

          <label htmlFor="age">Age(Years)</label>
          <input
            type="number"
            id="age"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          ></input>

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};
export default AddUser;
