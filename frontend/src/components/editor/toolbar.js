import React from "react"
import PropTypes from "prop-types"
import { ComponentItem, Toolbar as BaseToolbar } from "@remirror/react"

const toolbarItems = [
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
        type: ComponentItem.ToolbarMenu,

        items: [
          {
            type: ComponentItem.MenuGroup,
            role: "radio",
            items: [
              {
                type: ComponentItem.MenuCommandPane,
                commandName: "toggleHeading",
                attrs: { level: 3 },
              },
              {
                type: ComponentItem.MenuCommandPane,
                commandName: "toggleHeading",
                attrs: { level: 4 },
              },
              {
                type: ComponentItem.MenuCommandPane,
                commandName: "toggleHeading",
                attrs: { level: 5 },
              },
              {
                type: ComponentItem.MenuCommandPane,
                commandName: "toggleHeading",
                attrs: { level: 6 },
              },
            ],
          },
        ],
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
    ],
    separator: "end",
  },
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
    separator: "none",
  },
]

const Toolbar = (props) => <BaseToolbar items={toolbarItems} refocusEditor label="Top Toolbar" />

Toolbar.propTypes = {}

export default Toolbar
