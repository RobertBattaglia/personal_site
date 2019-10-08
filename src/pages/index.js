import React from "react"

import Layout from "../components/layout"

import Intro from "../components/intro"
import About from "../components/about"
import Skills from "../components/skills"
import Apps from "../components/apps"

function Index() {
  return (
    <Layout>
      <Intro />
      <About />
      <Skills />
      <Apps />
    </Layout>
  )
}

export default Index
