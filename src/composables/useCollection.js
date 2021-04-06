import { ref } from "vue"
import { projectFirestore } from "../firebase/config"

// Use collection from adding document function - must get collection name
const useCollection = (collection) => {

    // Initialize 'error' attribute
    const error = ref(null)
    const isPending = ref(false)

    // Add Doctument function - must gets document object
    const addDoc = async (doc) => {
        
        // Reset error vlue to null
        error.value = null
        isPending.value = true

        // Try to add the document to the collection
        try{
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            return res
        }
        
        // Catch an error
        catch(err) {
            console.log(err.message)
            error.value = 'Could not send the message'
            isPending.value = false
        }
    }

    // Return the necessary attributes and functions
    return { error, addDoc, isPending }
}

// Export default
export default useCollection