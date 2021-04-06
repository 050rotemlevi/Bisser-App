<!-- Template -->
<template>

    <!-- Run loop over the appointments array -->
    <div v-for="appointment in documents" :key="appointment.id">
      <!-- Show details for each appointment -->
      <router-link :to="{ name: 'ServiceDetails', params: {id: appointment.serviceId}}">
        <div class=single>
            <div class="info"> 
                <h3> {{ appointment.name }}</h3>
                <h4> {{ timestampToDate(appointment.date) }}</h4>
                <p class="hours"> {{ appointment.start }} - {{ appointment.end }}</p>
            </div>
        </div>
      </router-link>

    </div>

</template>

<!-- Script -->
<script>
// Imports
import getCollection from '../composables/getCollection'
import getUser from '@/composables/getUser'
import getTimestampDate from '@/composables/getTimestampDate'

// Export default
export default {

    // Setup
    setup() {
      // Get timestamp converte function
      const { timestampToDate } = getTimestampDate()

      // Get current user
      const { user } = getUser()
      // Get current user documents by user id
      const { error, documents } = getCollection(user.value.uid)

      console.log()

      // return necessary functions and attributes
      return { timestampToDate, documents, error }
    }

}
</script>


<!-- Style  -->
<style scoped>
.single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    max-width: 600px;
    border-bottom: 1px dotted #bbb;
    transition: all ease 0.2s;
    margin: 0 auto;
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .info {
    margin: 0 30px;
  }
  .no-appointments {
    padding: 70px 0;
    text-align: center;
  }
 
</style>