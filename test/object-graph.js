class Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }

  toString() {
    return this.data;
  }
}

const node = new Node(2, null);
const head = new Node(1, node);

debugger;
