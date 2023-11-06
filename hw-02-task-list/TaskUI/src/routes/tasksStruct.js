export class Item {
    constructor(id, name, isChecked) {
        this.id = id;
        this.name = name;
        this.isChecked = isChecked;
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    checkedChecked() {
        return this.isChecked;
    }

    static fromJson(json) {
        return new Item(json.id, json.name, json.isChecked);
    }
}

export class Tasks {
    constructor(items = []) {
        this.items = items;
    }
    
    getItems() {
        return this.items;
    }
    addItems(item) {
        this.items.push(item);
    }
    removeItem(id) {
        this.items = this.items.filter(x => x.id != id);
    }
    getSize() {
        return this.items.length;
    }
    getById(id) {
        return this.items.filter(x => x.id == id)[0];
    }

    static create() {
        return new Tasks();
    }
    static fromJson(json) {
        return new Tasks(json.map((i) => Item.fromJson(i)));
    }
}