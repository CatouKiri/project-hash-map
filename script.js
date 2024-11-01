const capacity = 16;
const loadFactor = 0.75;

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
    for (let i = 0; i < capacity; i++) {
      this.buckets[i] = [];
    }
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
      return;
    }

    while (current) {
      if(current.key === key) { // if key is already existing, update value
        current.value = value;
        return;
      }

      if(!current.next) { // if bucket is not empty, push new node to next linked list
        current.next = newNode;
        return;
      }

      current = current.next;
    }
  }

  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index][0];

    while (current) {
      if(current.key === key) { // if key is already existing, return value
        return current.value;
      }

      current = current.next;
    }

    return null; // if key doesn't exist, return null
  }

  // has(key)
  // remove(key)
  // length()
  // clear()
  // keys()
  // values()
  // entries()
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'edited')

console.log(test);
console.log(`the value of the "key" hat is ${test.get('hat')}`);
console.log(`the value of the "key" rock is ${test.get('rock')}`);
// console.log(`the hash map has the key carrot: ${test.has('carrot')}`);
// console.log(`the hash map has the key rock: ${test.has('rock')}`);
