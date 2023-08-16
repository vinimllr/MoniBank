export default function ehMaiorDeIdade(campo){
    const dataDeNascimento = new Date(campo.value);
    if(!validaIdade(dataDeNascimento)){
        campo.setCustomValidity("menor de Idade")
    }
}

function validaIdade(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}