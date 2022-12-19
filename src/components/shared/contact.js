import React from "react";
import styled from "@emotion/styled";
import { theme, mediaQueries } from "../../constants";

import { Button } from "./header";

const Wrapper = styled("section")`
  min-height: 30vh;
  background: linear-gradient(${theme.secondaryColor}, ${theme.primaryColor});
  padding-top: 10rem;
`;

const FormWrapper = styled("div")`
  margin: 0 auto;
  padding: 0 1rem 2rem;
  width: 80vw;
  text-align: center;
  border: solid 3px ${theme.primaryColor};
  border-radius: 3rem;
  background-color: #fff;

  ${mediaQueries.tablet} {
    width: 540px;
  }
`;

const Title = styled("h3")`
  margin-top: 3.375rem;
`;

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled("label")`
  padding: 0.5rem 0rem;
  font-size: 1.5rem;
`;

const Input = styled("input")`
  display: block;
  width: 95%;
  margin: 0 auto;
  padding: 0 1rem;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`;

const Textarea = styled("textarea")`
  display: block;
  width: 95%;
  margin: 0 auto;
  padding: 0 1rem;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  font-size: 1.25rem;
`;

const SubmitButton = styled(Button)`
  margin: 1rem 0 0 0;
`;

const Contact = () => (
  <Wrapper id="contact">
    <FormWrapper>
      <Title>Contact Me</Title>
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
);

export default Contact;
