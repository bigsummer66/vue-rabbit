import { ref } from 'vue'

const defaultErrorMessage = '加载失败，请稍后重试'

export const useAsyncData = (request, options = {}) => {
  const { immediate = true, initialData = [] } = options

  const data = ref(initialData)
  const loading = ref(false)
  const error = ref('')

  const execute = async (...args) => {
    loading.value = true
    error.value = ''

    try {
      const res = await request(...args)
      data.value = res?.result ?? res
      return data.value
    } catch (err) {
      error.value = err?.response?.data?.message || err?.message || defaultErrorMessage
      throw err
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute().catch(() => {})
  }

  return {
    data,
    loading,
    error,
    execute
  }
}
