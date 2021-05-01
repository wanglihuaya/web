class Zoon {
  name: String
  age: Number
  constructor(info: String) {
    console.log(this)
    this.name = info
    this.age = 10
    console.log('Name:', this.name)
  }
}

let z = new Zoon('OKKKKKKK')
