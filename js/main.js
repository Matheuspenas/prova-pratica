let dadosLista = [];
let modoEdicao = false;
let indexEdicao = null;

// Evento de envio do formulário
document.getElementById("listaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const tarefa = document.getElementById("Adicionar").value.trim();
    const data = document.getElementById("data").value;

    if (!tarefa || !data) return;

    if (modoEdicao) {
        dadosLista[indexEdicao] = { tarefa, data, concluida: dadosLista[indexEdicao].concluida };
        modoEdicao = false;
        indexEdicao = null;
        document.getElementById("btnSubmit").textContent = "Salvar";
    } else {
        dadosLista.push({ tarefa, data, concluida: false });
    }

    criarLista();
    this.reset();
});

// Criação da Tabela
function criarLista() {
    let tabela = `
        <thead>
            <tr>
                <th>Tarefas</th>
                <th>Datas</th>
                <th>Estado</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < dadosLista.length; i++) {
        const item = dadosLista[i];

        tabela += `
            <tr>
                <td>${item.tarefa}</td>
                <td>${item.data}</td>
                <td>
                    <input type="checkbox" onchange="alterarEstado(${i})" ${
            item.concluida ? "checked" : ""
        } ${modoEdicao ? "disabled" : ""}>
                    ${item.concluida ? "Concluída" : "Pendente"}
                </td>
                <td>
                    <button class="editar" onclick="editarTarefa(${i})" ${
            modoEdicao ? "disabled" : ""
        }><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                    <button class="excluir" onclick="excluirTarefa(${i})" ${
            modoEdicao ? "disabled" : ""
        }><i class="fa-solid fa-trash"></i> Excluir</button>
                </td>
            </tr>
        `;
    }

    tabela += `</tbody>`;
    document.getElementById("tabela").innerHTML = tabela;
}

// Alterar estado da tarefa
function alterarEstado(index) {
    dadosLista[index].concluida = !dadosLista[index].concluida;
    criarLista();
}

// Excluir
function excluirTarefa(index) {
    if (modoEdicao) return;
    dadosLista.splice(index, 1);
    criarLista();
}

// Editar
function editarTarefa(index) {
    if (modoEdicao) return;

    const item = dadosLista[index];
    document.getElementById("Adicionar").value = item.tarefa;
    document.getElementById("data").value = item.data;

    modoEdicao = true;
    indexEdicao = index;
    document.getElementById("btnSubmit").textContent = "Atualizar";
}