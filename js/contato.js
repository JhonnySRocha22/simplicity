"use strict";

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

//Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    

    let cep; //undefined

/* Verificando se o cep NÃO tem 8 dígitos
O operador !== significa "diferente de" */
if (campoCep.value.length !== 8) {
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