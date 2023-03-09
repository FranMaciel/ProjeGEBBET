const btn = document.querySelector("#calc");
const formContainer = document.querySelector("#form-container");
const resultContainer = document.querySelector("#result-container");
let imc;
let classificacao;
let gastoEnergeticoBasal;
let gastoEnergeticoTotal;

btn.addEventListener("click", function (e){
    e.preventDefault();
    const genero = document.querySelector('input[name="genero"]:checked');
    const vGenero = genero.value;
    const idade = document.querySelector("#inputIdade");
    const vIdade = idade.value;
    const peso = document.querySelector("#inputPeso");
    const vPeso = peso.value;
    const altura = document.querySelector("#inputAltura");
    const vAltura = altura.value;
    const fatorAt = document.getElementById("fa");
    const opcaoFA = fatorAt.options[fatorAt.selectedIndex].value;
    const fatorIn = document.getElementById("fi");
    const opcaoFI = fatorIn.options[fatorIn.selectedIndex].value;
    const valorDoIMC = document.querySelector("#valorIMC");
    const classificacaoDoIMC = document.querySelector("#classificIMC");
    const valorDoGEB = document.querySelector("#valorGEB");
    const valorDoGET = document.querySelector("#valorGET");


    if(document.getElementById("inputIdade").value ==  "" ||
    document.getElementById("inputPeso").value == "" ||
    document.getElementById("inputAltura").value == "" || 
        document.getElementById("fa").selectedIndex == [0] || 
        document.getElementById("fi").selectedIndex == [0] )  {
        alert("Observe os campos e veja se falta alguma informação. A altura deve ser dada em centímetros(Ex. 160)");
        return;
        
    } else if (document.getElementById("inputIdade").value <= "19" && 
    document.getElementById("inputPeso").value <= "6,5" &&
     document.getElementById("inputAltura").value < "60"){
         alert("Por favor, preencha os campos com dados válidos para avaliar adulto ou idoso!"); 
         return; }
  
    if(document.getElementById("inputIdade").value <= "19" && 
        document.getElementById("inputPeso").value <= "6,5" &&
        document.getElementById("inputAltura").value < "60"){
            alert("Por favor, preencha os campos com dados válidos para avaliar adulto ou idoso!"); 
            return;

   }else{
        calcIMC(vPeso, vAltura);
        classifIMC(vIdade, imc);
        gasto_energetico_basal(vGenero, vIdade, vPeso, vAltura);
        gasto_energetico_total(gastoEnergeticoBasal, opcaoFA, opcaoFI);
   }


    showResultado();
    resultado (valorDoIMC, classificacaoDoIMC,valorDoGEB, valorDoGET);

});

/*Função calcular o IMC*/
function calcIMC(vPeso, vAltura){
    if(vPeso !== "" || vAltura !== ""){
        imc = (vPeso /(vAltura/100)/(vAltura/100)).toFixed(2);
    } else {
        alert("Insira peso e altura válido");
        
    }
}


/*Função para classificar o IMC*/
function classifIMC(vIdade, imc){
    if (vIdade < 60){
        if (imc < 18.5){
            classificacao = "Baixo peso";
    
        } else if (imc  >= 18.5 && imc  < 25){
            classificacao = "Peso normal";
    
        } else if (imc  >= 25 && imc < 30){
            classificacao = "Excesso de peso";
    
        } else if (imc  >= 30 && imc< 35){
            classificacao = "Obesidade classe I";
    
        } else if (imc >= 35 && imc  < 40){
            classificacao = "Obesidade classe II";
    
        } else if(imc  >= 40) {
            classificacao = "Obesidade classe III";

        };

    } else if (imc > 22 && imc < 27){
        classificacao = "Peso normal";
    } else if (imc <= 22){
        classificacao = "Baixo peso";
    } else if (imc >= 27) {
        classificacao = "Excesso de peso";
    } else{
        alert("Insira peso e altura válido")
    }     
};


/*Função para calcular o GEB e o GET*/
function gasto_energetico_basal(vGenero, vIdade, vPeso, vAltura) {
    if(vGenero === 'f'){
        gastoEnergeticoBasal = (655.0955 + 9.56 * vPeso + 1.8496 * vAltura - 4.6756 * vIdade).toFixed(2);
    } else if(vGenero === 'm') {
        gastoEnergeticoBasal = (64.473 + 13.7516 * vPeso + 5.0033 * vAltura - 6.7550 * vIdade).toFixed(2);
    } else{
        alert("Insira o gênero.")
    }
}

function gasto_energetico_total(gastoEnergeticoBasal, opcaoFA, opcaoFI){
    gastoEnergeticoTotal = (gastoEnergeticoBasal * opcaoFA * opcaoFI).toFixed(2);
}



function resultado (valorDoIMC, classificacaoDoIMC,valorDoGEB, valorDoGET){
    valorDoIMC.innerHTML = imc;
    classificacaoDoIMC.innerHTML = classificacao;
    valorDoGEB.innerHTML = gastoEnergeticoBasal;
    valorDoGET.innerHTML = gastoEnergeticoTotal;
};

function showResultado(){
    formContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
};



