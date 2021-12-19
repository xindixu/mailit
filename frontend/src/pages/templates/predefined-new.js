import React, { useState, useCallback, useEffect } from "react"
import { Spin } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import apiFetch from "../../lib/api-fetch"
import TemplateForm from "./form"

const PreTemplateNew = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState({})
  const { id } = useParams()

  const history = useHistory()

  useEffect(() => {
    apiFetch({ route: `templates/${id}` }).then(({ data }) => {
      setTemplate({ ...data.attributes, id })
    })
  }, [id])

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
          apiFetch({
            route: `templates/${id}/built_in/used`,
            method: "post",
          })
          setIsSaving(false)
          goBack()
        }
      })
    },
    [goBack]
  )

  return isEmpty(template) ? (
    <Spin />
  ) : (
    <TemplateForm
      isSaving={isSaving}
      onCancel={goBack}
      onFinish={onFinish}
      saveText="Update"
      template={template}
    />
  )
}

export default PreTemplateNew
