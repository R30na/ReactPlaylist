const StorageService = {

    async saveItem(key, item) {
        try {
            localStorage.setItem(key, JSON.stringify(item))
            return true
        } catch (error) {
            console.log('Error: ' + error)
            alert(JSON.stringify(error, null, 4))
        }
    },

    async getItem(key) {
        try {
            const value = localStorage.getItem(key)
            return await JSON.parse(value)
        } catch (error) {
            console.log('Error: ' + error)
            alert(JSON.stringify(error, null, 4))
        }
    },


}

export default StorageService 