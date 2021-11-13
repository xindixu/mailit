import React from "react"
import PropTypes from "prop-types"
import { ComponentItem, Toolbar as BaseToolbar } from "@remirror/react"

const toolbarItems = ({ onClickInsertImage }) => [
  {
    type: ComponentItem.ToolbarGroup,
    label: "History",
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: "undo", display: "icon" },
      { type: ComponentItem.ToolbarCommandButton, commandName: "redo", display: "icon" },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleColumns",
        display: "icon",
        attrs: { count: 2 },
      },
    ],
    separator: "end",
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: "Simple Formatting",
    items: [
      { type: ComponentItem.ToolbarCommandButton, commandName: "toggleBold", display: "icon" },
      { type: ComponentItem.ToolbarCommandButton, commandName: "toggleItalic", display: "icon" },
      { type: ComponentItem.ToolbarCommandButton, commandName: "toggleStrike", display: "icon" },
      { type: ComponentItem.ToolbarCommandButton, commandName: "toggleCode", display: "icon" },
    ],
    separator: "end",
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: "Heading Formatting",
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 1 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 2 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 3 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 4 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 5 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleHeading",
        display: "icon",
        attrs: { level: 6 },
      },
    ],
    separator: "end",
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: "Simple Formatting",
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: "toggleBlockquote",
        display: "icon",
      },
      { type: ComponentItem.ToolbarCommandButton, commandName: "toggleCodeBlock", display: "icon" },
      {
        type: ComponentItem.ToolbarButton,
        display: "icon",
        onClick: onClickInsertImage,
        icon: "imageAddLine",
      },
    ],
    separator: "none",
  },
]

const Toolbar = ({ onClickInsertImage }) => (
  <BaseToolbar items={toolbarItems({ onClickInsertImage })} refocusEditor label="Top Toolbar" />
)

Toolbar.propTypes = {
  onClickInsertImage: PropTypes.func.isRequired,
}

export default Toolbar
