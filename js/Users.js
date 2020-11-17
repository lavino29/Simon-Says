export default class Users {
    constructor(name,point){
        this.point = point
        this.name = name
    }
    save(name,point){
        localStorage.setItem(name,point);
        console.log(name,point)
    }
    deleteUser(){
        localStorage.clear()
    }

}