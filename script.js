const capacity = 16;
const loadFactor = 0.75;

class HashMap {
    constructor() {
        this.buckets = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.buckets[i] = [];
        }
    }

    hash(key, capacity) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    }

    // set(key, value) {
    // }
}

// function