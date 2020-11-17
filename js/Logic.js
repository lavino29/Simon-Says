export default class Logic {
    constructor(){

    }
    color_array(array,colors) {
      const colorsArray = array.map((data) => {
        return colors[data];
      });
      return colorsArray;
    }
    logic_click(data,click){

    }
    logic_color(data,lengt,finish){
    
            if(finish){
                let flag = 0 || lengt
                const arrayHandler =()=>{
                   
                   return data.splice(0,flag)
                   flag++
                   
                }
                
                return arrayHandler()
            }else{
                console.log('reintentar')
            }
            
        
    }
    
  }