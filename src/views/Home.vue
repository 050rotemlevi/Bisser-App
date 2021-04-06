<!-- Template  -->
<template>

  <!-- Show current user his own appointments if exists -->
  <AppointmentsView /> 

</template>

<!-- Script  -->
<script>
// Imports
import AppointmentsView from '../components/AppointmentsView.vue'

// Export default
export default {
  name: 'Home',
  components: { AppointmentsView },

}
</script>



