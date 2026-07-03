const phoneRegExp = /^1\d{10}$/
const postalCodeRegExp = /^\d{6}$/

export const normalizeLoginPayload = ({ account = '', password = '' } = {}) => {
  return {
    account: account.trim(),
    password: password.trim()
  }
}

export const validateAddressForm = (form = {}) => {
  const requiredFields = [
    ['receiver', '请填写收货人姓名'],
    ['contact', '请填写正确的手机号'],
    ['provinceCode', '请填写省份编码'],
    ['cityCode', '请填写城市编码'],
    ['countyCode', '请填写地区编码'],
    ['address', '请填写详细地址'],
    ['postalCode', '请填写正确的邮政编码'],
    ['addressTags', '请填写地址标签'],
    ['fullLocation', '请填写完整地址']
  ]

  for (const [field, message] of requiredFields) {
    const value = `${form[field] ?? ''}`.trim()
    if (!value) {
      return message
    }
  }

  if (!phoneRegExp.test(`${form.contact}`.trim())) {
    return '请填写正确的手机号'
  }

  if (!postalCodeRegExp.test(`${form.postalCode}`.trim())) {
    return '请填写正确的邮政编码'
  }

  return ''
}
