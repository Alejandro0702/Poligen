
    let seleccionP = document.getElementById('padre');
    seleccionP.addEventListener("change",removeMsjP);
    let seleccionM = document.getElementById('madre');
    seleccionM.addEventListener("change",removeMsjM);

function removeMsjP(){
    document.getElementById('padre_error').innerHTML = " ";
}
function removeMsjM(){
    document.getElementById('madre_error').innerHTML = " ";
}
let c = [0,0,0,0,0];
let g = new Array();

function Calcular(){
    let a = document.getElementById('padre').selectedIndex - 1;
    let b = document.getElementById('madre').selectedIndex - 1;
    if (a != -1 && b != -1) {
        document.getElementById('resultados').style.display = 'block';
        document.getElementById('resultado').style.display = 'block';
        ctx.putImageData(imageData, 0, 0);
        let colores = ["Azul", "Verde", "Miel", "Cafe", "Negro"];
        let alelos =["aabb","Aabb","AaBb","AABb","AABB"];
        let p = alelos[a].split('');
        let m = alelos[b].split('');
        let punnett = matrizPunnett(combinar(p),combinar(m));
        Genotipos(punnett);
        let res = "";
        for (let i = 0; i < 5; i++){
            console.log(colores[i] + ": " + prom(c[i], punnett.length) + "%");
            document.getElementById('c'+i).innerHTML = prom(c[i], punnett.length) + "%";    
            //res = res + (colores[i] + ": " + prom(c[i], punnett.length) + "%<br>");
        }
        dibujarTexto(punnett);
        c = [0,0,0,0,0];    
    }
    else{
        if(a == -1){
            let error = document.getElementById('padre_error');
            let msjErr = "Selecciona un color de ojos!";
            error.innerHTML = msjErr;
        }
        if(b == -1){
            let error = document.getElementById('madre_error');
            let msjErr = "Selecciona un color de ojos!";
            error.innerHTML = msjErr;
        }
    }
    
}

let combinar = function(array){
    let t = [];
    for (let i = 0; i < array.length/2; i++)
        for (let j = array.length/2; j < array.length; j++)
            t.push(array[i].concat(array[j]));
    return t;
}
let matrizPunnett = function (t1, t2){
    let m = [];
    let array = [];
    for (let i = 0; i < t1.length; i++)
        for (let j = 0; j < t1.length; j++) {  
            array[i] = t1[i].concat(t2[j]);
            m.push(array[i]);
        } 
    return m;
}
function Genotipos(grupos){
    for (let j = 0; j < grupos.length; j++){
        let Alelos = [];
        Alelos = grupos[j].split('');
        let sum = 0;
        for (let i = 0; i < 4; i++)
            if(Alelos[i] == "A" || Alelos[i] == "B")
                sum += 1;   
        //Aqui se define el tipo de color de la posicion
        Color(sum, j);
    }
}
function Color(sum, j){
    switch (sum) {
        case 0:// 0 alelos dominantes   Azul
            c[0]++;
            g[j] = 0;
            break;
        case 1:// 1 alelos dominantes   Verde
            c[1]++;
            g[j] = 1;
            break;
        case 2:// 2 alelos dominantes   Miel
            c[2]++;
            g[j] = 2;
            break;
        case 3:// 3 alelos dominantes   Cafe claro
            c[3]++;
            g[j] = 3;
            break;
        case 4:// 4 alelos dominantes   Cafe oscuro/negro
            c[4]++;
            g[j] = 4;
            break;
    }
}
function prom(x, y){   return (x*100)/y;  }

//canvas
var elemento = document.getElementById("micanvas");
var ctx = elemento.getContext('2d');
//let tam = 100;//document.getElementById('resultados').clientWidth * 0.098;//tamaño de cada cuadro
let tam = window.innerWidth * 0.15;
if(tam >120)tam = 100;
console.log("tam: " + tam);
let dimMatr = tam*4; //dimension (cantidad de cuadros)


//ctx.canvas.width = document.getElementById('resultados').clientWidth * 0.6; //ancho de canvas
//ctx.canvas.height = window.innerHeight;                                     //altura de canvas
//console.log(ctx.canvas.height);


for (let x = 50; x < dimMatr; x+=tam) {
    for (let y = 50; y < dimMatr; y+=tam) {
        ctx.strokeRect(x,y,tam,tam);//dibuja el contorno de los cuadros
    }
}
let imageData = ctx.getImageData(0,0,elemento.width,elemento.height);//Almacena el canva inicial (solo las lineas)
function dibujarTexto(p){
    ctx.font = tam*0.15 + 'px Arial';
    let i = 0;
    for (let x = 50; x < dimMatr; x+=tam){
        for (let y = 50; y < dimMatr; y+=tam){
            ctx.fillText(p[i],x+(tam*0.35),y+(tam*0.9));//dibuja el texto
            dibujarOjos(i, x, y);
            i++;
        }
    }
}

function dibujarOjos(i, x, y){
    let img_base = new Image();
    switch (g[i]) {
        case 0://Azul
            img_base.src = 'assets/img/OjoAzul.png';
        break;
        case 1://Verde
            img_base.src = 'assets/img/OjoVerde.png';
            break;
        case 2://Miel
            img_base.src = 'assets/img/OjoMiel.png';
            break;
        case 3://Cafe
            img_base.src = 'assets/img/OjoCafe.png';
            break;
        case 4://Cafe oscuro/negro
            img_base.src = 'assets/img/OjoNegro.png';
            break;
    }
    img_base.onload = function(){
        ctx.drawImage(img_base, x, y, tam, tam);
    }
}
//canvas