<!-- Template  -->
<template>
  <!-- Run loop over services document -->
  <div v-for="service in services" :key="service.id">
      <!-- Create a router link for each service to 'ServiceDetails' view component -->
      <!-- With each service id as params -->
      <router-link :to="{ name: 'ServiceDetails', params: {id: service.id}}">
          <!-- Show service details -->
          <div class=single-bs>
              <div class="info-bs">
                  <h3> {{ service.name }}</h3>
                  <h4> {{ timestampToDate(service.date) }} </h4>
                  <h5> By {{ service.displayName}} </h5>
              </div>
          </div>
      </router-link>
  </div>

</template>

<!-- Script  -->
<script>
// Imports
import getTimestampDate from '@/composables/getTimestampDate'

// Export default
export default {

    // Props: services documents
    props: ['services'],

    // Setup
    setup() {
      // Get timestamp converte function
      const { timestampToDate } = getTimestampDate()
      
      // Return necessary function and attributes    
      return { timestampToDate }
    }

}
</script>

<!-- Style  -->
<style scoped>
.single-bs {
    display: flex;
    max-width: 600px;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    background: white;
    margin: 0 auto;
    transition: all ease 0.2s;
    border-bottom: 1px dotted #bbb;
  }
  .single-bs:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info-bs {
    margin: 0 30px;
  }
</style>