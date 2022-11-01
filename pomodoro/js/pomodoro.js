window.onload = () => {
    //Variables timer
    let currentTime;    //Minutos seteados
    let seconds = 0;
   
   
    //Variables pomodoro
   let workTime;       //Tiempo de trabajo
   let breakTime;      //Tiempo de descanso
   let timesCompleted=0  //Ciclos de 25+5 completados
   let cyclesGoal;     //Ciclos ingresados por el usuario
   let cyclesCompleted=0;  //Ciclos completados
   
   //Conexiones con el frontend
   
   let clock=document.getElementById("clock");
   let clockTitle=document.getElementById("clockTitle");
   let cyclesInput=document.getElementById("cycles-input");
   let startButton=document.getElementById("start-button");
   let workTimeInput=document.getElementById("work-time");
   let breakTimeInput=document.getElementById("break-time");
   
   //funcion de actualizar variables
   function populateVariables() {
       console.log("populate Variables")
       workTime=workTimeInput.value;   //Minutos
       breakTime=breakTimeInput.value; //Descanso
       cyclesGoal=cyclesInput.value;   //Ciclos
       timesCompleted=0                //Ciclos completados
       }
   
       //Funcion para imprimir los numeros en el reloj
   function updateClock() {
       clockMinutes=formatNumbers(currentTime);
       clockSeconds=formatNumbers(seconds);
       clock.innerHTML=clockMinutes+":"+clockSeconds;
       }
       
   //Boton start
   startButton.onclick=()=>{
       populateVariables();
       startPomodoro();
       }
   
   function startPomodoro() {
       console.log("pomodoro empezado");
       pomodoroController();
   }
   
   //Funcion para la pausa larga(final)
   function finish() {
       if(timesCompleted/2==cyclesGoal){
           return true
       } else{
           return false
       }
   }
   
   //Funcion para definir trabajo o descanso o terminado
   let terminado=false;
   function pomodoroController() {
       if (finish()==true) {
               timesCompleted=0;
               terminado=true
               console.log("Pomodoro terminado")
               clockTitle.innerHTML="Fin!"

               restartClock();
               return
       } else {
       if (timesCompleted%2==0) {                     //Los procesos pares son siempre los de trabajo
           currentTime=workTime;
           timesCompleted++;
           timer();
           clockTitle.innerHTML="Trabajo:"
           console.log("Tiempo de trabajo" +timesCompleted + "ciclos" +cyclesCompleted)
       } else {                        //Si no es par, significa que sigue descanso o en su caso, el descanso largo(final)
           currentTime=breakTime;
           timesCompleted++;
           timer();
           clockTitle.innerHTML="Descanso:"
           console.log("Tiempo de descanso" +timesCompleted + "ciclos" +cyclesCompleted)
       }
   }
   }
   
   //Reinicia el reloj a 0
   function restartClock() {
    clock.innerHTML="00:00";
    }
   
   //funcion de reloj 
   function timer() {
    if (terminado==true) {
        return null
    } else {
        if (currentTime > 0 || seconds > 0) {
            if (seconds == 0) {
                seconds=59;
                currentTime--;
            } else {
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            setTimeout(timer, 1000);
            
        } else {
            pomodoroController();
        }
    }
    }
    
    //Cambiar formato numeros dle reloj
   function formatNumbers(time) {
       if (time<10) {
           return "0"+time;
       } else {
           return time
       }
   }
}