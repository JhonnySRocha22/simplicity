"use strict";

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");


//Seleção do campo telefone
const campoTelefone = formulario.querySelector("#telefone") 

//Seleção do campo telefone usando jQuery
//const campoTelefone = ${"#telefone"};
 

//Ativando a máscara para telefone e cep
$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");
//Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    

    let cep; //undefined

/* Verificando se o cep NÃO tem 8 dígitos
O operador !== significa "diferente de" */
if (campoCep.value.length !== 9) {
    //Alerte o usuário sobre o erro de digitação
    mensagem.textContent = "digite um CEP válido!";
    mensagem.style.color = "purple";
    

    //Para execução
    return;
}else {
    //caso contrario (ou seja, tem 8 dígitos), guarde o valor
    cep = campoCep.value;

}


/* AJAX -> Técnica de comunicação Assíncrona para acessar uma API 
(www.viacep.com,.br) */

//ETAPA 01: preparar a URL da API com o CEP digitando 
const url = `https://viacep.com.br/ws/${cep}/json/`;

//ETAPA 02: Acessar a API (com a url) e aguardar o retorno dela
const resposta = await fetch(url);



//Etapa 03: extrair os dados da resposta em formato JSON
const dados = await resposta.json();


//Etapa 04: lidas com os dados de resposta (em caso de erro ou sucesso)
if ("erro" in dados) {
    mensagem.textContent = "CEP inexistente!";
    mensagem.style.color = "red";
   
} else {
 mensagem.textContent = "CEP encontrado!";
 mensagem.style.color = "green"


campoBairro.value = dados.bairro;
campoEndereco.value = dados.logradouro;
campoEstado.value = dados.localidade;
campoCidade.value = dados.uf;

}



});





/* Peogramação do Formspree */



    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: formulario.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Seus dados foram enviados!! Aguardo Retorno.";
          formulario.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Deu Ruim!! Algo de errado não está certo!"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Deu Ruim!! Algo de errado não está certo!"
      });
    }
    formulario.addEventListener("submit", handleSubmit)