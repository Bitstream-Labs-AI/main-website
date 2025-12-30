import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Not yet used, but useful for global state. Will be used to help with adding download counter views
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
