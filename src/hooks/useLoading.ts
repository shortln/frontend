import { ref } from 'vue'

export default <F extends () => Promise<any>>(asyncFun: F) => {
  const isLoading = ref(false)
  return {
    isLoading,
    nAsyncFun: () => {
      isLoading.value = true
      return asyncFun()
        .then(r => (isLoading.value = false) || r) as ReturnType<F>
    }
  }
}
