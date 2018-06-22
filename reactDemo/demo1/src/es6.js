class Parent {
  constructor(x,y){
      this.x = x;
      this.y = y;
  }
  render(){
      // 给parent的原型上设置render方法、
  }
  static ajax(){
      // Parent.ajax() 把Parent当做一个普通的对象，设置的私有属性方法，和实例没有关系
  }
}
Parent.prototype.AA = 12;  // Es6中，只能写方法，而且不能是箭头函数，不能设置属性，需要拿出来像这样设置
Parent.BB = 12;  // 把它作为对象设置的私有属性也只能拿到外面设置。在react中情况却不一样，

class Children extends Parent{
    constructor(){
        super(10,20);  // 相当于把Parent的constructor 执行，相当于 Parent.constructor.call(this,10,20);
        // 子类只能继承父类原型上的公有属性和方法，对于父类作为普通对象设置的私有属性和方法是无法继承的，
    }
}

console.dir(new Children());

/*
*{
* x:10
* y:20
* __proto__:Parent.prototype
*  constructor:class Children
*  __proto__:
*    constructor:class Parent
*    AA:12
*    render:
*    __proto__:Object.prototype
* }
*/