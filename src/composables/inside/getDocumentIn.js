import { ref, watchEffect } from "vue"
import { projectFirestore } from "@/firebase/config"

// Get document function - must get a collection name to work with
const getDocumentIn = (collection1, id1, collection2, id2) => {

    // Initialize document and error attributes
    const document = ref(null)
    const error = ref(null)

    // Initialize document reference attribute 
    let documentRef = projectFirestore.collection(collection1).doc(id1).collection(collection2).doc(id2)

    // Set a listener to the current document using onSnapshot 
    const unsub = documentRef.onSnapshot((doc) => {

        // If the document has data == its exists
        if(doc.data()){
            document.value = { ...doc.data(), id: doc.id }
            error.value = null
        }
        else {
            error.value = 'Document not exists'
        }
    },
    // If error catched, print the error, reset documents array to null and set an error message value
    (err) => {
        console.log(err.message)
        error.value = 'Could not fetch document'
    })

    // Unsubbscribe onSnapshot listener when needed
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })

    // Return necessary attributes
    return { error, document }
}

// Export default
export default getDocumentIn