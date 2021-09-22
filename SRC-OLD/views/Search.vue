<!-- Template  -->
<template>
  <!-- If error exists show error details -->
  <div v-if="error" class="error">
    <p> {{ error }}</p>
  </div>

  <!-- Else - create 'ListView' component with services documents -->
  <div v-else>
    <SearchListView :services="documents" />
  </div>

</template>

<!-- Script  -->
<script>
// Imports
import SearchListView from '@/components/SearchListView.vue'
import getCollection from '@/composables/getCollection'
import { ref } from 'vue'

// Export default
export default {
  name: 'Search',
  components: { SearchListView },

  // Setup
  setup() {

    const searchValue = ref('')

    
    const { error,  documents} = getCollection('services')

    
    // Return necessary attributes and functions
    return { error, documents, searchValue }
  }
}
</script>


