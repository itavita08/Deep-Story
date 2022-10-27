import React from "react"

export const Form = ({input, onFormChange, onFormSubmit}) => {

  const handleChange = (event)=>{
      // handle what the form does when you type in it
      onFormChange(event.target.value)
  }

  const handleSubmit = (event)=>{
      // handle what the form does when it is submitted
      event.preventDefault()
      onFormSubmit()
  }

  return(
      <>
          <form onSubmit={handleSubmit}>
              <input className='form-class' type='text' required value={input} onChange={handleChange}></input>
              <input type='submit'></input>
          </form>
      </>
  )
}