import React, { useEffect } from "react"
import styled from "@emotion/styled"
import { theme, mediaQueries } from "../../constants"

import { Button } from "./header"

const Wrapper = styled("section")`
  min-height: 30vh;
  background: linear-gradient(${theme.secondaryColor}, ${theme.primaryColor});
  padding-top: 2rem;
`

const FormWrapper = styled("div")`
  margin: 0 auto;
  padding: 0 1rem 2rem;
  width: 540px;
  text-align: center;
  border: solid 3px ${theme.primaryColor};
  border-radius: 3rem;
  font-size: 2rem;
  background-color: #fff;
  box-shadow: -0.5rem -0.5rem 0.7rem rgba(0, 0, 0, 0.6);

  ${mediaQueries.small} {
    width: 80vw;
  }
`

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const Label = styled("label")`
  padding: 0.5rem 0rem;
  font-size: 1.5rem;
`

const Input = styled("input")`
  display: block;
  width: 95%;
  margin: 0 auto;
  padding: 0 1rem;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`

const Textarea = styled("textarea")`
  display: block;
  width: 95%;
  margin: 0 auto;
  padding: 0 1rem;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`

const SubmitButton = styled(Button)`
  margin: 1rem 0 0 0;
`

const Contact = () => {
  useEffect(() => {
    const textArea = document.querySelector("#contact-message")
    textArea.rows = window.innerWidth <= 768 ? 8 : 4
  }, [])
  return (
    <Wrapper id="contact">
      <FormWrapper>
        <h2>Contact Me</h2>
        <p>I'd love to hear from you!</p>
        <Form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <Label>
            Email
            <Input type="email" name="email" />
          </Label>
          <Label>
            Message
            <Textarea id="contact-message" name="message" rows={4} />
          </Label>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </FormWrapper>
    </Wrapper>
  )
}

export default Contact
