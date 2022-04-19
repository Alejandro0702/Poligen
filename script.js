let c = [0,0,0,0,0];
let g = new Array();

function Calcular(){
    elemento.style.display = 'block';
    ctx.putImageData(imageData, 0, 0);
    let colores = ["Azul", "Verde", "Miel", "Cafe", "Negro"];
    let alelos =["aabb","Aabb","AaBb","AABb","AABB"];
    let a = document.getElementById('padre').selectedIndex - 1;
    let b = document.getElementById('madre').selectedIndex - 1;
    let p = alelos[a].split('');
    let m = alelos[b].split('');
    let punnett = matrizPunnett(combinar(p),combinar(m));
    Genotipos(punnett);
    let res = "";
    for (let i = 0; i < 5; i++){
        console.log(colores[i] + ": " + prom(c[i], punnett.length) + "%");
        res = res + (colores[i] + ": " + prom(c[i], punnett.length) + "%<br>");
    }
    dibujarTexto(punnett);
    document.getElementById('resultado').innerHTML = res;
    c = [0,0,0,0,0];
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
let tam = 100;
let dimMatr = tam*4;
for (let x = 50; x < dimMatr; x+=tam) {
    for (let y = 50; y < dimMatr; y+=tam) {
        ctx.strokeRect(x,y,tam,tam);
    }
}
let imageData = ctx.getImageData(0,0,elemento.width,elemento.height);//Almacena el canva inicial
function dibujarTexto(p){
    ctx.font = '15px Arial';
    let i = 0;
    for (let x = 50; x < dimMatr; x+=tam){
        for (let y = 50; y < dimMatr; y+=tam){
            ctx.fillText(p[i],x+35,y+93);
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