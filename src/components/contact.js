import React from "react"
import styled from "@emotion/styled"

const Wrapper = styled("section")`
  min-height: 30vh;
  margin: 0 auto;
`

const Form = styled("form")`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Contact = () => {
  return (
    <Wrapper id="contact">
      <p>Contact Me</p>
      <Form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
        ></input>
        <input type="text" name="name" placeholder="Foo Bar"></input>
        <textarea></textarea>
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
  )
}

export default Contact
