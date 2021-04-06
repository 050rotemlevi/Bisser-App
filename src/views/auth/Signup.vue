<template>
    <!-- Signup form -->
  <form @submit.prevent="handleSubmit">
      <!-- Signup title and inputs -->
      <h3>Sign up</h3>
      <input type="text" placeholder="Display Name" v-model="displayName">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">

      <!-- Error message div -->
      <div v-if="error" class="error"> {{ error }}</div>
      
      <!-- Button section: if 'isPending' true, show an disable 'loading' button  -->
      <button v-if="!isPending">Signup</button>
      <button v-if="isPending" disabled>Loading ...</button>

  </form>
</template>

<script>

import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

    export default {

        setup() {

            const displayName = ref('')
            const email = ref('')
            const password = ref('')

            const router = useRouter()
            const {error, signup, isPending} = useSignup()

            const handleSubmit = async () => {
                const res = await signup(email.value, password.value, displayName.value)
                if(!error.value){
                    router.push({ name: 'Home'})
                }
            }
            return { displayName, email, password, isPending, error, handleSubmit }
        }
    }
    
</script>

<style>

</style>