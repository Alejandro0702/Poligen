let c = [0,0,0,0,0];
function Calcular(){
    let colores = ["Azul", "Verde", "Miel", "Cafe", "Negro"];
    let alelos =["aabb","Aabb","AaBb","AABb","AABB"];
    let a = document.getElementById('padre').selectedIndex - 1;
    let b = document.getElementById('madre').selectedIndex - 1;
    let p = alelos[a].split('');
    let m = alelos[b].split('');
    let comb1 = combinar(p);
    let comb2 = combinar(m);
    Genotipos(matrizPunnett(comb1,comb2));
    for (let i = 0; i < 5; i++)
        console.log(colores[i] + ": " + prom(c[i]) + "%");
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
function prom(x){   return (x*10)/1.6;  }