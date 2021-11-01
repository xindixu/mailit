import React from "react"
import { Table } from "antd"

const SelectTemplate = (props) => {
  const { selectedRowKeys, setSelectedRowKeys, columns, data } = props

  const onSelectChange = (selected) => {
    setSelectedRowKeys(selected)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
    type: "radio",
    selections: [Table.SELECTION_INVERT, Table.SELECTION_NONE],
  }

  return (
    <Table
      rowSelection={rowSelection}
      pagination={false}
      scroll={{ y: 400 }}
      columns={columns}
      dataSource={data}
    />
  )
}

SelectTemplate.propTypes = {}

export default SelectTemplate
