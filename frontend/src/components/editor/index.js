import React, { useState } from "react"
import { useWindowSize } from "react-use"
import MDEditor from "@uiw/react-md-editor"

const TEMPLATE = `
Dear {{first_name}}:

I hope that you can take a moment to rest as midterm season continues. Taking five minutes to stretch, breathe or get up for a short walk can make a big difference. Try setting a reminder or alarm on your phone and have a plan in place for what to do with your time to yourself. 

One common method that you might find helpful is the Pomodoro Method. You can use whatever segments of time work best for you, but this image will help you to understand the basic concept.


![](https://communications.universitylife.columbia.edu/sites/default/files/civicrm/persist/contribute/images/uploads/static/POMODORO_GRAPHIC_2048x2048_10cc11c5bccfb8239585cd8d58ed7acb.jpg)
`
const HEIGHT_OFFSET = 120
const MarkdownEditor = () => {
  const { height } = useWindowSize()

  const [content, setContent] = useState(TEMPLATE)
  return <MDEditor value={content} onChange={setContent} height={height - HEIGHT_OFFSET} />
}

MarkdownEditor.propTypes = {}

export default MarkdownEditor
