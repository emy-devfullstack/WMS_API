const API_URL = "http://localhost:5181";

const listaMateriais = document.getElementById("listaMateriais");
const statusLista = document.getElementById("statusLista");

const totalMateriais = document.getElementById("totalMateriais");
const totalAtivos = document.getElementById("totalAtivos");
const totalInativos = document.getElementById("totalInativos");

let materiaisCache = [];

async function listarMateriais() {
  try {
    statusLista.textContent = "Carregando materiais...";

    const response = await fetch(`${API_URL}/api/materiais`);

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const materiais = await response.json();

    materiaisCache = materiais;

    renderizarMateriais(materiais);
    atualizarCards(materiais);
    preencherSelectMateriais(materiais);

    statusLista.textContent = `${materiais.length} material(is) encontrado(s)`;
  } catch (error) {
    statusLista.textContent = "Erro ao carregar materiais";
    listaMateriais.innerHTML = `
      <p class="empty">
        Não foi possível carregar os materiais. Verifique se a API está rodando e se a porta no script.js está correta.
      </p>
    `;
    console.error(error);
  }
}

async function listarAtivos() {
  try {
    statusLista.textContent = "Carregando materiais ativos...";

    const response = await fetch(`${API_URL}/api/materiais/ativos`);

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const materiais = await response.json();

    renderizarMateriais(materiais);
    statusLista.textContent = `${materiais.length} material(is) ativo(s)`;
  } catch (error) {
    statusLista.textContent = "Erro ao carregar ativos";
    console.error(error);
  }
}

async function listarInativos() {
  try {
    statusLista.textContent = "Carregando materiais inativos...";

    const response = await fetch(`${API_URL}/api/materiais/inativos`);

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const materiais = await response.json();

    renderizarMateriais(materiais);
    statusLista.textContent = `${materiais.length} material(is) inativo(s)`;
  } catch (error) {
    statusLista.textContent = "Erro ao carregar inativos";
    console.error(error);
  }
}

function atualizarCards(materiais) {
  totalMateriais.textContent = materiais.length;
  totalAtivos.textContent = materiais.filter(material => material.ativo).length;
  totalInativos.textContent = materiais.filter(material => !material.ativo).length;
}

function preencherSelectMateriais(materiais) {
  const select = document.getElementById("saidaMaterialId");

  select.innerHTML = `<option value="">Selecione um material</option>`;

  materiais
    .filter(material => material.ativo)
    .forEach(material => {
      const estoqueTotal = calcularEstoqueTotal(material);

      const option = document.createElement("option");
      option.value = material.id;
      option.textContent = `${material.nome} | Estoque: ${estoqueTotal}`;

      select.appendChild(option);
    });
}

function renderizarMateriais(materiais) {
  listaMateriais.innerHTML = "";

  if (!materiais || materiais.length === 0) {
    listaMateriais.innerHTML = `
      <p class="empty">Nenhum material encontrado.</p>
    `;
    return;
  }

  materiais.forEach(material => {
    const estoqueTotal = calcularEstoqueTotal(material);

    const lotesHtml = material.lotes && material.lotes.length > 0
      ? material.lotes.map(lote => `
          <div class="lote">
            <strong>Lote:</strong> ${lote.codigo}
            <br />
            <strong>Quantidade:</strong> ${lote.quantidade}
            <br />
            <strong>Entrada:</strong> ${formatarData(lote.dataEntrada)}
            <br />
            <strong>Vencimento:</strong> ${lote.dataVencimento ? formatarData(lote.dataVencimento) : "Sem vencimento"}
          </div>
        `).join("")
      : `<p class="empty">Sem lotes cadastrados.</p>`;

    const item = document.createElement("div");
    item.className = "material-item";

    item.innerHTML = `
      <div class="material-top">
        <h4>${material.nome}</h4>

        <span class="badge ${material.ativo ? "active" : "inactive"}">
          ${material.ativo ? "Ativo" : "Inativo"}
        </span>
      </div>

      <div class="material-info">
        <strong>ID:</strong> ${material.id}
        <br />
        <strong>Categoria:</strong> ${material.categoria}
      </div>

      <div class="stock">
        Estoque total: ${estoqueTotal}
      </div>

      <div class="lotes">
        ${lotesHtml}
      </div>

      <div class="actions">
        <button onclick="removerMaterial(${material.id})">Remover material</button>
      </div>
    `;

    listaMateriais.appendChild(item);
  });
}

document.getElementById("formCadastro").addEventListener("submit", async function(event) {
  event.preventDefault();

  const id = Number(document.getElementById("id").value);
  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const ativo = document.getElementById("ativo").value === "true";

  const loteId = Number(document.getElementById("loteId").value);
  const codigoLote = document.getElementById("codigoLote").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const dataEntrada = document.getElementById("dataEntrada").value;
  const dataVencimento = document.getElementById("dataVencimento").value || null;

  if (!nome || !categoria || !codigoLote) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (quantidade <= 0) {
    alert("A quantidade do lote precisa ser maior que zero.");
    return;
  }

  const material = {
    id: id,
    nome: nome,
    categoria: categoria,
    ativo: ativo,
    lotes: [
      {
        id: loteId,
        codigo: codigoLote,
        quantidade: quantidade,
        dataEntrada: dataEntrada,
        dataVencimento: dataVencimento
      }
    ]
  };

  try {
    const response = await fetch(`${API_URL}/api/materiais`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(material)
    });

    if (!response.ok) {
      alert("Erro ao cadastrar material.");
      return;
    }

    alert("Material cadastrado com sucesso!");

    this.reset();
    listarMateriais();
  } catch (error) {
    alert("Erro ao conectar com a API.");
    console.error(error);
  }
});

document.getElementById("formSaida").addEventListener("submit", async function(event) {
  event.preventDefault();

  const materialId = Number(document.getElementById("saidaMaterialId").value);
  const quantidade = Number(document.getElementById("saidaQuantidade").value);

  if (!materialId) {
    alert("Selecione um material para registrar a saída.");
    return;
  }

  if (quantidade <= 0) {
    alert("A quantidade de saída precisa ser maior que zero.");
    return;
  }

  const saida = {
    materialId: materialId,
    quantidade: quantidade
  };

  try {
    const response = await fetch(`${API_URL}/api/materiais/saida`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(saida)
    });

    const contentType = response.headers.get("content-type");

    let resultado;

    if (contentType && contentType.includes("application/json")) {
      resultado = await response.json();
    } else {
      resultado = await response.text();
    }

    if (!response.ok) {
      document.getElementById("resultadoSaida").textContent =
        typeof resultado === "string" ? resultado : "Erro ao registrar saída.";
      return;
    }

    document.getElementById("resultadoSaida").textContent =
      `Saída realizada: ${resultado.quantidadeRetirada} unidade(s) de ${resultado.material}.`;

    this.reset();
    listarMateriais();
  } catch (error) {
    document.getElementById("resultadoSaida").textContent =
      "Erro ao conectar com a API.";

    console.error(error);
  }
});

async function removerMaterial(id) {
  const confirmar = confirm("Deseja remover este material?");

  if (!confirmar) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/materiais/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      alert("Erro ao remover material.");
      return;
    }

    alert("Material removido com sucesso!");
    listarMateriais();
  } catch (error) {
    alert("Erro ao conectar com a API.");
    console.error(error);
  }
}

function calcularEstoqueTotal(material) {
  if (!material.lotes || material.lotes.length === 0) {
    return 0;
  }

  return material.lotes.reduce((total, lote) => {
    return total + Number(lote.quantidade || 0);
  }, 0);
}

function formatarData(data) {
  if (!data) {
    return "-";
  }

  const dataObj = new Date(data);

  return dataObj.toLocaleDateString("pt-BR", {
    timeZone: "UTC"
  });
}

listarMateriais();