<!-- Template  -->
<template>
  <!-- If error exists show error details -->
  <div v-if="error" class="error">
    <p> {{ error }}</p>
  </div>

  

  <!-- Else - create 'ListView' component with services documents -->
  <div v-else>

    <!-- Search Bar -->
    <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <br>

    <ListView :services="documents" />
  </div>

</template>

<!-- Script  -->
<script>
// Imports
import ListView from '@/components/ListView.vue'
import getCollection from '@/composables/getCollection'

// Export default
export default {
  name: 'Search',
  components: {ListView},

  // Setup
  setup() {
    // Get collection funciton for using all services documents
    const { error, documents} = getCollection('services')

    // Return necessary attributes and functions
    return { error, documents }
  }
}
</script>

<style scoped>
  .d-flex {
    display: flex;
    max-width: 600px;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    background: white;
    margin: 0 auto;
    transition: all ease 0.2s;
    border-bottom: 1px dotted #bbb;
  }
</style>