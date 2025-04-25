// Lista de dados (tarefas)
let dadosLista = [];

// Evento de envio do formulário
document.getElementById("listaForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    if (!validarFormulario()) return;
    if (!validarFormulario()) return;

    const tarefa = document.getElementById("adicionar").value.trim();
    const data = parseFloat(document.getElementById("data").value.trim);

    criarLista();
    this.reset();
});