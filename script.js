let elemento = document.getElementById("micanvas");
let ctx = elemento.getContext('2d');

/*
ctx.strokeText('Hola',70,75);
ctx.strokeRect(50,50,100,100);
ctx.strokeRect(50,100,100,100);
ctx.strokeRect(50,150,100,100);
ctx.strokeRect(50,200,100,100);

ctx.strokeRect(100,50,100,100);
ctx.strokeRect(100,100,100,100);
ctx.strokeRect(100,150,100,100);
ctx.strokeRect(100,200,100,100);

ctx.strokeRect(150,50,100,100);
ctx.strokeRect(150,100,100,100);
ctx.strokeRect(150,150,100,100);
ctx.strokeRect(150,200,100,100);

ctx.strokeRect(200,50,100,100);
ctx.strokeRect(200,100,100,100);
ctx.strokeRect(200,150,100,100);
ctx.strokeRect(200,200,100,100);*/

let c = [0,0,0,0,0];

const tam = 120;
for (let x = 50; x < 600; x+=tam) {
    for (let y = 50; y < 600; y+=tam) {
        ctx.strokeRect(x,y,tam,tam);
    }
}
function Calcular(){
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
        res = res + (colores[i] + ": " + prom(c[i], punnett.length) + "%\n");
    }
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
        Color(sum);
    }
}
function Color(sum){
    switch (sum) {
        case 0:
            c[0]++;
            break;
        case 1:
            c[1]++;
            break;
        case 2:
            c[2]++;
            break;
        case 3:
            c[3]++;
            break;
        case 4:
            c[4]++;
            break;
    }
}
function prom(x, y){   return (x*100)/y;  }