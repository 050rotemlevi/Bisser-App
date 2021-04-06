<!-- Template  -->
<template>
  <!-- Create Service form -->
  <form @submit.prevent="click">
    <!-- Title -->
    <h4>Create New Service</h4>
    
    <!-- Inputs -->
    <input type="text" required placeholder="Service Name" v-model="title">

    <select class="form-select" multiple aria-label="multiple select example" v-model="day">
        <option selected value="1">Sunday</option>
        <option selected value="2">Monday</option>
        <option selected value="3">Tuesday</option>
    </select>


    <input type="text" placeholder="Start Time" v-model="start">
    <input type="text" placeholder="End Time" v-model="end">
    
    <label for="customRange2" class="form-label">Time Slot</label>
    <input type="range" class="form-range" min="5" max="120" id="customRange2" v-model="time">
    <label>{{ time }}</label>
    
    <!-- Error div for firebase error -->
    <div class=error></div>

   

    <!-- Create button -->
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving ...</button>
  
  </form>

   <button @click="rotem">ROTEM</button>
</template>

<!-- Script  -->
<script>
// Imports
import getSlots from '@/composables/getSlots'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Export default
export default {
    
    // Setup
    setup() {

        // Form attributes
        const title = ref('')
        const start = ref('')
        const end = ref('')
        const time = ref('')

        const day = ref([])

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

        const click = () => {
            console.log(day.value)
        }

        const rotem = () => {
          var now = new Date();
          var des = new Date();
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";

          des.setDate(des.getDate() + 30)
          for (var d = now; d <= des; d.setDate(d.getDate() + 1)) {
              var fuck = new Date(d)
              console.log(weekday[fuck.getDay()])

          }
        }

        // Return necessary attributes and functions
        return { title, handleSubmit, isPending, start, end, time, error, day, click, rotem }
    }
}
</script>

<!-- Style -->
<style>
  form {
    background: white;
  }
  label {
    font-size: 16px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }

</style>