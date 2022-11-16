import React from "react";

export const Form = ({ input, onFormChange, onFormSubmit }) => {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="form-class"
          type="text"
          required
          value={input}
          onChange={handleChange}
        ></input>
        <input type="submit"></input>
      </form>
    </>
  );
};
