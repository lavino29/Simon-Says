import Logic from "./js/Logic.js";
import User from "./js/Users.js";
const login = document.querySelector("#login_btn");
const form = document.getElementsByName("difficulty");
const form_main = document.querySelector("#form_login");
const table = document.querySelector("#table");
const colors_selector = document.querySelector("#colors");
const startButton = document.querySelector("#container_start");
const turn = document.querySelector("#turn");
const input_name = document.querySelector("#input_name");
const reglas = document.querySelector(".reglas");
const logic = new Logic();
const easy = 20;
const mediun = 50;
const colors = ["blue", "yellow", "red", "green"];
let hard = 100;
let flag = false;
let array_principal = [];
let array_principal2 = [];
let contador = 1;
let array_click = [];
let bandera = 0;
let users = [
  { name: 'jose', pts: 100 },
  {name: 'rhanna', pts: 5},
  { name: 'luis', pts: 15 },
];
let user = { name: "", pts: 0 };
//--------------------------------
/* LOCAL STORAGE */ 
//--------------------------------
window.addEventListener('DOMContentLoaded',()=>{
  const ui = new UI()
  if(localStorage.length>0){
    for(let i = 0 ; i< localStorage.length ;i++){
     let value = localStorage.key(i)
    let result = localStorage.getItem(value)
    users.push({name:value, pts:result})
    
    }
    
    const result = ui.rankingUsers(users)
    table.appendChild(result)
  }else{
    
    const result = ui.rankingUsers(users)
      table.appendChild(result)
  }
})
//--------------------------------
/* ----- Funcion Random  -------*/
//--------------------------------
const random = () => {
  const result = Math.round(Math.random() * -3 + 3);
  return result;
};

//-----------------------------------------------------------------------
/* ----- Funcion Para crear un array con posiciones aleatorias  -------*/
//-----------------------------------------------------------------------

/* BOTON DE INICIO DE LA APLICACION */
startButton.addEventListener("click", () => {
  const ui = new UI();
  if (flag == true) {
    ui.paintAllColors(array_principal2, contador);
  }
});
//--------------------------------
/* BOTON DE LOGIN */
//--------------------------------
login.addEventListener("click", (e) => {
  
  e.preventDefault();
  user.name = input_name.value;
  form_main.classList.add("active_form");
  setTimeout(() => {
    reglas.children[0].textContent = `${user.name}`;
    reglas.children[0].style.position = "absolute;";
    reglas.classList.add("active_reglas");
  }, 900);
  for (let i = 0; i < form.length; i++) {
    if (form[i].checked == true) {
      if (form[i].value == "easy") {
        array_principal = [];
        while (array_principal.length < easy) {
          array_principal.push(random());
        }
      }
      if (form[i].value == "mediun") {
        array_principal = [];
        while (array_principal.length < mediun) {
          array_principal.push(random());
        }
      }
      if (form[i].value == "hard") {
        array_principal = [];
        while (array_principal.length < hard) {
          array_principal.push(random());
        }
      }
      flag = true;
      break;
    }
    if (form.length - 1 == i) {
      alert("No ingreso dificultad");
      flag = false;
    }
  }

  array_principal2 = logic.color_array(array_principal, colors);
});

colors_selector.addEventListener("click", (e) => {
  if (e.target.id == "red" || "blue" || "yellow" || ("green" && flag == true)) {
    array_click.push(e.target.id);
    validateClick(e.target.id);
  }
});

const validateClick = (click) => {
  const ui = new UI();

  if (contador >= array_click.length) {
    if (array_click[bandera] === array_principal2[bandera]) {
      ui.paintOneColorClick(click);
      bandera++;
      if (contador == array_click.length) {
        setTimeout(() => {
          ui.deleteColors();
        }, 500);

        setTimeout(() => {
          contador++;
          ui.paintAllColors(array_principal2, contador);
          array_click = [];
          bandera = 0;
        }, 1000);
      }
    } else if (
      array_click[bandera] != array_principal2[bandera] &&
      flag == true
    ) {
      const userSave = new User();
      userSave.save(user.name,array_click.length);
      users.push({name:user.name,pts:array_click.length})
      const result = ui.rankingUsers(users)
      table.innerHTML =` <tr class="tr">
      <th class="th">#</th>
      <th class="th">Name</th>
      <th class="th">record</th>
  </tr>`
      table.appendChild(result)
      bandera = 0;
      array_click = [];
      contador = 1;
      alert("has perdido");
      
    }
  }
};

class UI {
  paintOneColorClick(data) {
    let colorChildren = [...colors_selector.children];
    if (data.length > 0) {
      for (let i = 0; i < colorChildren.length; i++) {
        if (colorChildren[i].id === data) {
          setTimeout(() => {
            this.deleteColors();
          }, 500);
          if (this.deleteColors() == true) {
            if (colorChildren[i].className == "red") {
              colorChildren[i].classList.add("active_red");
            } else if (colorChildren[i].className == "yellow") {
              colorChildren[i].classList.add("active_yellow");
            } else if (colorChildren[i].className == "blue") {
              colorChildren[i].classList.add("active_blue");
            } else if (colorChildren[i].className == "green") {
              colorChildren[i].classList.add("active_green");
            }
          }
        }
      }
    }
  }
  paintAllColors(data, click, valor) {
    let number = -1;
    let colorChildren = [...colors_selector.children];
    flag = false;
    startButton.children[1].classList.toggle("active_button--red");

    turn.style.display = "none";
    const interval = setInterval(() => {
      if (click == 1) {
        flag = true;
      }
      if (number == click) {
        clearInterval(interval);
        flag = true;
        this.deleteColors();

        startButton.children[1].classList.toggle("active_button--red");

        turn.style.display = "inline";
      }
      number++;

      if (number < click) {
        for (let i = 0; i < colorChildren.length; i++) {
          if (
            colorChildren[i].classList.value == "yellow active_yellow" ||
            "red active_red" ||
            "blue active_blue" ||
            "green active_green"
          ) {
            this.deleteColors();
            setTimeout(() => {
            
              if (colorChildren[i].className === array_principal2[number]) {
                if (colorChildren[i].className == "yellow") {
                  colorChildren[i].classList.add("active_yellow");
                }
                if (colorChildren[i].className == "red") {
                  colorChildren[i].classList.add("active_red");
                }
                if (colorChildren[i].className == "green") {
                  colorChildren[i].classList.add("active_green");
                }
                if (colorChildren[i].className == "blue") {
                  colorChildren[i].classList.add("active_blue");
                }
              }
            }, 400);
          } else if (colorChildren[i].className === array_principal2[number]) {
            if (this.deleteColors() == true) {
              
              if (colorChildren[i].className == "blue") {
                colorChildren[i].classList.add("active_blue");
              }
              if (colorChildren[i].className == "red") {
                colorChildren[i].classList.add("active_red");
              }
              if (colorChildren[i].className == "yellow") {
                colorChildren[i].classList.add("active_yellow");
              }
              if (colorChildren[i].className == "green") {
                colorChildren[i].classList.add("active_green");
              }
            }
          }
        }
      }
    }, 1000);
  }
  deleteColors() {
    let colorChildren = [...colors_selector.children];
    for (let i = 0; i < colorChildren.length; i++) {
      if (colorChildren[i].className == "red active_red") {
        colorChildren[i].classList.remove("active_red");
      } else if (colorChildren[i].className == "yellow active_yellow") {
        colorChildren[i].classList.remove("active_yellow");
      } else if (colorChildren[i].className == "blue active_blue") {
        colorChildren[i].classList.remove("active_blue");
      } else if (colorChildren[i].className == "green active_green") {
        colorChildren[i].classList.remove("active_green");
      }
      if (i == 3) {
        return true;
      }
    }
  }

  rankingUsers(data) {
   
    const result1  = data.sort((a,b)=> b.pts - a.pts) 
    const fragment = document.createDocumentFragment();
    result1.forEach((result,i) => {
      
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      td.classList.add('td')
      td1.classList.add('td')
      td2.classList.add('td')
      tr.appendChild(td2);
      tr.appendChild(td);
      tr.appendChild(td1);
      
      td2.textContent = `${i+1}`
      td.textContent = `${result.name}`;
      td1.textContent = `${result.pts}`;
      fragment.appendChild(tr);
      
    });

    return fragment;
  }
}
