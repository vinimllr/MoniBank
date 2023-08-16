import ehCpf from "./validaCpf.js";
import ehMaiorDeIdade from "./validacaoDeIdade.js";
const inputs = document.querySelectorAll("[required]");
const form = document.querySelector("[data-formulario]");

inputs.forEach(campo => {
    campo.addEventListener("blur", () => verificaCampo(campo))
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const listaDeRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }
    
    localStorage.setItem("cadastro", JSON.stringify(listaDeRespostas));
    window.location.href = "./abrir-conta-form-2.html"
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = "";
    campo.setCustomValidity('');
    if(campo.name == "cpf" && campo.value.length >= 11){
        ehCpf(campo)
    }
    if(campo.name == "aniversario" && campo.value != ''){
        ehMaiorDeIdade(campo)
    }
    console.log(campo.validity)
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
        }
    })
    const mensagemDeErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();
    if(!validadorDeInput){
        mensagemDeErro.textContent = mensagem;
    } else {
        mensagemDeErro.textContent = ''
    }
}

