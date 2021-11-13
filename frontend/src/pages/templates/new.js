import React, { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import apiFetch from "../../lib/api-fetch"
import TemplateForm from "./form"

const TemplateNew = () => {
  const [isSaving, setIsSaving] = useState(false)

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
    <TemplateForm
      isSaving={isSaving}
      onCancel={goBack}
      onFinish={onFinish}
      saveText="Create"
      template={{}}
    />
  )
}

export default TemplateNew
