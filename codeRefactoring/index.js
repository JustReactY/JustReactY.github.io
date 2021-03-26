class Vector {
    size() {}
    isEmpty() {}
    isAndroid() {}
    isIOS() {}
}

class MyStack {
    constructor() {
        this._vector = new Vector()
    }
    size() {
        return this._vector.size()
    }
    push(element) {
        insertElementAt(element, 0);
    }
    pop() {
        const result = firstElement();
        removeElementAt(0);
        return result;
    }
}