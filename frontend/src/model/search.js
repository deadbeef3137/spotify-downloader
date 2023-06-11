import { ref, computed } from 'vue'

import API from '/src/model/api'

const searchTerm = ref('')
const results = ref()
const isSearching = ref(false)
const error = ref(false)
const errorValue = ref('')

function useSearchManager() {
  function isValid(str) {
    return isValidSearch(str) || isValidURL(str)
  }
  function isValidSearch(str) {
    if (
      str === '' ||
      str.includes('://open.spotify.com/playlist/') ||
      str.includes('://open.spotify.com/album/') ||
      str.includes('://open.spotify.com/show/') ||
      str.includes('://open.spotify.com/artist/')
    ) {
      return false
    }
    return true
  }
  function isValidURL(str) {
    if (str.includes('://open.spotify.com/track/')) {
      return true
    }
    return false
  }

  function searchFor(query) {
    console.log('Searching for:', query)
    results.value = []
    isSearching.value = true
    searchTerm.value = query
    error.value = false
    errorValue.value = ''
    API.search(query)
      .then((res) => {
        console.log('Received Data:', res.data)
        if (res.status === 200) {
          results.value = res.data
          isSearching.value = false
        } else {
          console.log('Error:', res)
          isSearching.value = false
          error.value = true
          errorValue.value = res.toString()
        }
      })
      .catch((err) => {
        console.log('Other Error:', err.message)
        isSearching.value = false
        error.value = true
        errorValue.value = err.message
      })
  }

  return {
    searchTerm,
    isSearching,
    results,
    error,
    errorValue,
    searchFor,
    isValid,
    isValidSearch,
    isValidURL,
  }
}

export { useSearchManager }
