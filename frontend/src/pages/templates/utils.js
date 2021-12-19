export const formValueToRequestParams = (values, authState) => {
  const { collaborators = [] } = values
  const collaborator_ids = collaborators.map(({ value }) => value)
  return { ...values, collaborator_ids, user_id: authState.user_id }
}
