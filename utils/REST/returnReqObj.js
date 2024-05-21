/* eslint-disable */

export const returnReqObj = (methodName, toSendData = undefined, token = null) => {
  return {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `${token}` } : {}),
    },
    body: JSON.stringify(toSendData),
  }
}
