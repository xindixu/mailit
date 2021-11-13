import React, { useState, useEffect, useCallback } from "react"
import { Spin } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import apiFetch from "../../lib/api-fetch"
import TemplateForm from "./form"

const TemplateShow = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState({})
  const { id } = useParams()

  useEffect(() => {
    apiFetch({ route: `templates/${id}` }).then(({ data }) => {
      setTemplate({ ...data.attributes })
    })
  }, [id])

  const history = useHistory()

  const goBack = useCallback(() => {
    history.push("/")
  }, [history])

  const onFinish = useCallback(
    (values) => {
      setIsSaving(true)
      console.log("finish", values)

      apiFetch({
        route: `templates/${id}`,
        method: "patch",
        params: { ...values, user_id: 1, collaborator_ids: [1] },
      }).then(({ status }) => {
        if (status === 200) {
          setIsSaving(false)
          goBack()
        }
      })
    },
    [goBack, id]
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

export default TemplateShow
