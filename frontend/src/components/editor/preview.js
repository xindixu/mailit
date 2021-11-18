import { useHelpers } from "@remirror/react"

const Preview = () => {
  const { getMarkdown } = useHelpers(true)

  return (
    <pre>
      <code>{getMarkdown()}</code>
    </pre>
  )
}

export default Preview
