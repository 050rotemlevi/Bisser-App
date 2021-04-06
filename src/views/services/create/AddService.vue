<!-- Template  -->
<template>
  <!-- Create Service form -->
  <form @submit.prevent="handleSubmit">
    <!-- Title -->
    <h4>Create New Service</h4>
    
    <!-- Inputs -->
    <input type="text" required placeholder="Service Name" v-model="title">
    <datepicker v-model="picked" />
    <input type="text" placeholder="Start Time" v-model="start">
    <input type="text" placeholder="End Time" v-model="end">
    
    <label for="customRange2" class="form-label">Time Slot</label>
    <label>{{ time }} Minutes</label>
    <input type="range" class="form-range" min="5" max="120" id="customRange2" v-model="time">

  
    <!-- Error div for firebase error -->
    <div class=error></div>

    <!-- Create button -->
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving ...</button>
  
  </form>
</template>

<!-- Script  -->
<script>
// Imports
import Datepicker from 'vue3-datepicker'
import getSlots from '@/composables/getSlots'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Export default
export default {
    components: {Datepicker },

    // Setup
    setup() {

        // Form attributes
        const title = ref('')
        const picked = ref(new Date())
        const start = ref('')
        const end = ref('')
        const time = ref('60')

        // Imported attributes
        const { user } = getUser()
        const router = useRouter()
        const { error, addDoc, isPending } = useCollection('services')
                
        // Handle Submit function
        const handleSubmit = async () => {
            // Create new 'service' object with necessary values
            const service = {
              userId: user.value.uid,
              displayName: user.value.displayName,
              name: title.value,
              date: picked.value,
              start: start.value,
              end: end.value,
              createdAt: timestamp(),
              arr: getSlots(start.value, end.value ,time.value)
            }

            // Add the document and store the result in response (res = the created document id)
            const res = await addDoc(service)
            
            // If no errors, push by the routher to ''ServiceDetails' to show 
            // The current service details (using a params with the id)
            if(!error.value){
              router.push( {name: 'ServiceDetails', params: {id: res.id}})
            }
        }

        // Return necessary attributes and functions
        return { title, picked, handleSubmit, isPending, start, end, time, error }
    }
}
</script>

<!-- Style -->
<style>
  form {
    background: white;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;

  }
</style>