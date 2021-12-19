import React, { useState, useCallback, useContext } from "react"
import { useHistory } from "react-router-dom"
import apiFetch from "../../lib/api-fetch"
import { AuthContext } from "../../global-state"
import TemplateForm from "./form"
import { formValueToRequestParams } from "./utils"

const TemplateNew = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [authState] = useContext(AuthContext)

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
        params: formValueToRequestParams(values, authState),
      }).then(({ status }) => {
        if (status === 200) {
          setIsSaving(false)
          goBack()
        }
      })
    },
    [authState, goBack]
  )

  return (
    <TemplateForm
      isSaving={isSaving}
      onCancel={goBack}
      onFinish={onFinish}
      saveText="Create"
      template={{ id: "new" }}
    />
  )
}

export default TemplateNew
