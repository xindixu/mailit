import React, { useState, useEffect, useCallback } from "react"
import { Spin } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import apiFetch from "../../lib/api-fetch"
import TemplateForm from "./template-form"

const TemplateNew = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState({})

  const history = useHistory()

  const goBack = useCallback(() => {
    history.push("/")
  }, [history])

  const onFinish = useCallback(
    (values) => {
      setIsSaving(true)

      apiFetch({
        route: `templates`,
        method: "post",
        params: { ...values, user_id: 1, collaborator_ids: [1] },
      }).then(({ status }) => {
        if (status === 200) {
          setIsSaving(false)
          goBack()
        }
      })
    },
    [goBack]
  )

  return (
    <TemplateForm onFinish={onFinish} template={template} onCancel={goBack} isSaving={isSaving} />
  )
}

export default TemplateNew
