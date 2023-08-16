export default function ehCpf(campo){
    const cpf = campo.value.replace(/\.|-/g, "");
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)){
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaNumerosRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
        ]
        return cpf.includes(numerosRepetidos);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;
    for(let i = 0; i < 9; i++){
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma*10) %11;
    return soma != cpf[9];
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;
    for(let i = 0; i < 10; i++){
        soma += cpf[i] * multiplicador;
        multiplicador--;
    }

    soma = (soma*10) % 11;
    return soma != cpf[10];
}