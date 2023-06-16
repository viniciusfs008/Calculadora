let total = 0;
let buffer = '0';
let operador;
let virgula = 0;

const tela = document.querySelector('.tela');

function botaoClick(valor){
    if(isNaN(valor)){
        manipulaSimbolo(valor);
    }
    else{
        manipulaNumero(valor);
    }
    tela.innerText = buffer;
}

function manipulaSimbolo(simbolo){
    switch(simbolo){

        case 'C':
            buffer ='0';
            virgula = 0;
            break;

        case '=':
            if(operador === null){
                return;
            }
            calcula(simbolo);
            operador = null;
            buffer = total;
            total = 0;
            break;
        
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                if (buffer[buffer.length-1] === ",") {
                    virgula = 0;
                }
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        
        case ',':
            if (virgula == 0) {
                if (buffer === "0") {
                    return;
                }
                else{
                    buffer += ',';
                    virgula = 1;
                }  
            }
            break;
        
        case '+':
        case '-':
        case '÷':
        case 'x':
           calcula(simbolo);
           break; 
    }
}

function calcula(simbolo){
    if (buffer === '0') {
        return;
    }

    var numero;
    
    if (virgula === 1) {
        buffer = buffer.replace(",", ".");
        numero = parseFloat(buffer); 
        virgula = 0;
    }
    else{
        numero = parseInt(buffer); 
    }

    if (total === 0) {
        total = numero;
    }
    else{
        operacao(numero);
    }
    buffer = '0'
    operador = simbolo;
}

function operacao(numero){
    switch(operador){
        case '+':
            total += numero;
            total = formatarNumero(total, quantidadeAposAVirgula(total));
            break;
        case '-':
            total -= numero;
            total = formatarNumero(total, quantidadeAposAVirgula(total));
            break;
        case 'x':
            total *= numero;
            total = formatarNumero(total, quantidadeAposAVirgula(total));
            break;
        case '÷':
            total /= numero;
            total = formatarNumero(total, quantidadeAposAVirgula(total));
            break;
    }
}

function manipulaNumero(numero){
    if (buffer === "0") {
        buffer = numero;
    }
    else{
        buffer += numero;
    }
}

function quantidadeAposAVirgula(numero){
    if (Math.floor(numero) === numero) {
        return 0; // Não há casas decimais se o número for inteiro
    }

    const partes = numero.toString().split(".");
    if (partes.length === 2) {
        if (partes[1].length > 10) {
            return 10;
        }
        return partes[1].length; // Retorna o comprimento da parte decimal
    } 
    else {
        return 0; // Não há casas decimais se não houver parte decimal
    }

}

function formatarNumero(numero, casas) {
    if(casas > 0){
        var partes = numero.toFixed(casas).split('.');

        var parteInteira = partes[0];
        var parteDecimal = partes[1];
        
        var parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        
        var numeroFormatado = parteInteiraFormatada + ',' + parteDecimal;
    }
    else{
        var numeroFormatado = numero.toLocaleString('pt-BR');
    }
    
    return numeroFormatado;
}

function init(){
    document.querySelector('.botoes').addEventListener('click', function(event){
        botaoClick(event.target.innerText);
    })
}

init();