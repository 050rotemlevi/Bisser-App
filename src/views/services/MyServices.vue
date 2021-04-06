<!-- Template  -->
<template>

    <!-- Create new service button -->
    <button class="create-btn" @click="handleClick">Create</button>

    <!-- If error exists show error details -->
    <div v-if="error" class="error">
        <p> {{ error }}</p>
    </div>

    <!-- Else - create 'ListView' component with services documents -->
    <div v-else>
        <ListView :services="documents" />
    </div>

</template>

<!-- Script  -->
<script>
// Imports
import ListView from '@/components/ListView.vue'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

// Export default
export default {
  name: 'Search',
  components: {ListView},

  // Setup
  setup() {

      // Get current user
      const { user } = getUser()

      // Get router
      const router = useRouter()

      // Get collection funciton for using all services documents where current user own's the services
      const { error, documents} = getCollection('services',['userId', '==', user.value.uid])

      const handleClick = () => {
          router.push({name: 'ServiceOption'})
      }

      // Return necessary attributes and functions
      return { error, documents, handleClick }
  }
}
</script>

<style scoped>
    .create-btn {
        display: flex;
        max-width: 60px;
        align-items: center;
        padding: 5px;
        margin: 0 auto;
    }

</style>