import React from "react"
import styled from "@emotion/styled"
import { theme, mediaQueries } from "../constants"
import { Button } from "./header"

const Wrapper = styled("section")`
  min-height: 30vh;
  background: linear-gradient(${theme.secondaryColor}, ${theme.primaryColor});
`

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  width: 540px;
  border: solid 3px ${theme.primaryColor};
  border-radius: 3rem;
  font-size: 2rem;
  text-align: center;
  background-color: #fff;
  box-shadow: -0.5rem -0.5rem 0.7rem rgba(0, 0, 0, 0.6);

  ${mediaQueries.small} {
    width: 80vw;
  }
`

const Label = styled("label")`
  display: inherit;
  padding-left: 0.5rem;
  font-size: 1.5rem;
`

const Input = styled("input")`
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`

const Textarea = styled("textarea")`
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`

const SubmitButton = styled(Button)`
  margin: 1rem 0 0 0;
`

const Contact = () => {
  return (
    <Wrapper id="contact">
      <Form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <h2>Contact Me</h2>
        <p>I'd love to hear from you!</p>
        <Label>Email</Label>
        <Input type="email" name="email" />
        <Label>Name</Label>
        <Input type="text" name="name" />
        <Label>Message</Label>
        <Textarea rows={4} />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </Form>
    </Wrapper>
  )
}

export default Contact
