import React, { useState, useCallback, useEffect, useContext } from "react"
import { Spin } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import apiFetch from "../../lib/api-fetch"
import { AuthContext } from "../../global-state"
import TemplateForm from "./form"
import { formValueToRequestParams } from "./utils"

const PreTemplateNew = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState({})
  const [authState] = useContext(AuthContext)

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
        params: formValueToRequestParams(values, authState),
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
    [authState, goBack, id]
  )

  return isEmpty(template) ? (
    <Spin />
  ) : (
    <TemplateForm
      isSaving={isSaving}
      onCancel={goBack}
      onFinish={onFinish}
      saveText="Duplicate and Update"
      template={template}
    />
  )
}

export default PreTemplateNew
