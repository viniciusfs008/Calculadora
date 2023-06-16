let total = 0;
let buffer = '0';
let operador;

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
            break;

        case '=':
            if(operador === null){
                return;
            }
            calcula(simbolo);
            operador = null;
            buffer = formatarNumero(total, quantidadeAposAVirgula(total));
            total = 0;
            break;
        
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
                aux = converteParaNumero(buffer, 0);
                buffer = converteParaString(aux);
            }
            break;
        
        case ',':
            if (!buffer.includes(',')) {
                buffer += ',';
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
    var numero = converteParaNumero(buffer);

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
            break;
        case '-':
            total -= numero;
            break;
        case 'x':
            total *= numero;
            break;
        case '÷':
            total /= numero;
            break;
    }
}

function manipulaNumero(numero){
    if (buffer === "0") {
        buffer = numero;
    }
    else{
        buffer += numero;
        
        var aux = converteParaNumero(buffer);
        
        buffer = converteParaString(aux);
    }
}

function converteParaString(numero){
    return formatarNumero(numero, quantidadeAposAVirgula(numero));
}

function converteParaNumero(string, flag){
    var numero;
    string = string.replace(/[.]/gi, "");
    
    if (string.includes(',')) {
        string = string.replace(",", ".");
        numero = parseFloat(string); 
    }
    else{
        numero = parseInt(string);
    }
    return numero;
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