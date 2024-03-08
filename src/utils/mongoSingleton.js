import mongoose from "mongoose"

class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect(process.env.MONGOURL)
    }
    static getInstance() {
        if (this.#instance) {
            console.log('Base de datos previamente conectada.');
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('Base de datos conectada.');
        return this.#instance
    }
}

export default MongoSingleton