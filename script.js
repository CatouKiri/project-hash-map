const capacity = 16;

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(capacity);
    this.length = 0;
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = [];
    }
  }

  loadFactor() {
    return this.length / capacity;
  }

  outOfBounds(index, buckets) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const newNode = new Node(key, value);
    let current = this.buckets[index][0];

    if (!current) { // check if bucket is empty
      bucket.push(newNode);
      this.length++;
      return;
    }

    while (current) {
      if(current.key === key) { // if key is existing, update value
        current.value = value;
        return;
      }

      if(!current.next) { // if bucket is not empty, push new node to next linked list
        current.next = newNode;
        this.length++;
        return;
      }

      current = current.next;
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index][0];

    while (current) {
      if(current.key === key) { // if key is existing, return value
        return current.value;
      }

      current = current.next;
    }

    return null; // if key doesn't exist, return null
  }

  has(key) {
    const index = this.hash(key);
    let current = this.buckets[index][0];

    while (current) {
      if(current.key === key) { // if key is existing, return true
        return true;
      }

      current = current.next;
    }

    return false; // if key doesn't exist, return false
  }

  remove(key) {
    const index = this.hash(key);
    let current = this.buckets[index][0];
    let prev = null;

    while (current) {
        if (current.key === key) { // if key is existing
            if (prev === null) { // first node
                this.buckets[index][0] = current.next; // set bucket to null or next node
            } else { // remove middle or last node
                prev.next = current.next;
            }
            this.length--;
            return true;
        }
        // Move to the next node
        prev = current;
        current = current.next;
    }

    return false; // If key doesn't exist
  }

  length() {
    return this.length;
  }

  clear() {
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = [];  // Replace each bucket with a new empty list
    }
    this.length = 0; // Reset length after clearing
  }

  keys() {
    let keysArray = [];
    for (let i = 0; i < capacity; i++) {
      let current = this.buckets[i][0];
      while (current) {
        keysArray.push(current.key);
        current = current.next;
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i = 0; i < capacity; i++) {
      let current = this.buckets[i][0];
      while (current) {
        valuesArray.push(current.value);
        current = current.next;
      }
    }
    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < capacity; i++) {
      let current = this.buckets[i][0];
      while (current) {
        entriesArray.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entriesArray;
  }
}

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('lion', 'edited');
// test.set('moon', 'silver');

console.log(`the value of the "key" hat is ${test.get('hat')}`); // should return black
console.log(`the value of the "key" rock is ${test.get('rock')}`); // should return null
console.log(`the hash map has the key carrot: ${test.has('carrot')}`); // should return true
console.log(`the hash map has the key rock: ${test.has('rock')}`); // should return false
console.log(`remove node with the key elephant ${test.remove('elephant')}`); // first node in a linked list
console.log(`remove node with the key lion ${test.remove('lion')}`); // second node in a linked list
console.log(`remove node with the key rock ${test.remove('rock')}`); // should return false
console.log(`the total number of keys stored in the hash map is ${test.length}`); // should return 10
console.log(test.keys());
// console.log(`the total keys stored in the hash map is ${test.keys()}`); // should return all keys
console.log(test.values());
// console.log(`the total values stored in the hash map is ${test.values()}`); // should return all keys
console.log(test.entries());
// console.log(`the total key value pairs stored in the hash map is ${test.entries()}`); // should return all keys
// test.clear();
// console.log(`the total keys stored in the hash map is after using test.clear ${test.length}`); // should return 0
console.log(test.loadFactor());
console.log(test);