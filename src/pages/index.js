import React from "react"

import Layout from "../components/layout"

import Intro from "../components/intro"
import About from "../components/about"
import Skills from "../components/skills"

function Index() {
  return (
    <Layout>
      <Intro />
      <About />
      <Skills />
    </Layout>
  )
}

export default Index
