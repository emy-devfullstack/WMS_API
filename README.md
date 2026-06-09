# WMS Escolar - API e Front-end para Controle de Materiais Escolares

## Descrição do Projeto

O **WMS Escolar** é um sistema simples de controle de estoque de materiais escolares, desenvolvido com **ASP.NET Core Minimal API** no back-end e **HTML, CSS e JavaScript** no front-end.

O projeto permite cadastrar materiais escolares, organizar os itens por lotes, consultar materiais ativos e inativos, remover materiais e registrar a saída de estoque respeitando o controle por lote.

A aplicação foi desenvolvida com foco em uma interface **minimalista**, em **modo dark**, e com uma estrutura simples para facilitar o entendimento, manutenção e evolução do projeto.

---

## Integrantes

* Bruno Batista Xavier
* Emily Kristin Garcia
* Maria Eduarda Martins de Souza

---

## Objetivo

O objetivo do projeto é simular um sistema de controle de estoque para materiais escolares, permitindo operações básicas de cadastro, consulta, remoção e saída de estoque.

A API busca resolver a necessidade de:

* Listar materiais escolares cadastrados;
* Consultar materiais por ID;
* Identificar materiais ativos;
* Identificar materiais inativos;
* Cadastrar novos materiais;
* Organizar materiais por lotes;
* Controlar quantidade disponível em estoque;
* Registrar saída de materiais por lote;
* Remover materiais cadastrados.

---

## Tecnologias Utilizadas

### Back-end

* C#
* ASP.NET Core
* Minimal API
* Swagger
* .NET 10.0

### Front-end

* HTML
* CSS
* JavaScript
* Live Server

---

## Estrutura do Projeto

```text
ApiProdutos
├── Data
│   └── BancoSimulado.cs
│
├── Models
│   ├── MaterialEscolar.cs
│   ├── Lote.cs
│   └── SaidaEstoque.cs
│
├── Routes
│   ├── ROTA_GET.cs
│   ├── ROTA_GET_ATIVOS.cs
│   ├── ROTA_GET_INATIVOS.cs
│   ├── ROTA_POST.cs
│   ├── ROTA_DELETE.cs
│   └── ROTA_SAIDA.cs
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Properties
│   └── launchSettings.json
│
├── Program.cs
├── appsettings.json
├── appsettings.Development.json
└── ApiProdutos.csproj
```

---

## Entidades do Sistema

### MaterialEscolar

A entidade `MaterialEscolar` representa o material principal cadastrado no estoque.

| Atributo  | Tipo       | Descrição                                  |
| --------- | ---------- | ------------------------------------------ |
| Id        | int        | Identificador único do material            |
| Nome      | string     | Nome do material escolar                   |
| Categoria | string     | Categoria do material                      |
| Ativo     | bool       | Define se o material está ativo ou inativo |
| Lotes     | List<Lote> | Lista de lotes vinculados ao material      |

Exemplos de materiais escolares:

* Caderno Universitário
* Caneta Azul
* Cola Branca
* Lápis
* Borracha
* Apontador
* Régua
* Estojo

---

### Lote

A entidade `Lote` representa os lotes associados a cada material escolar.

| Atributo       | Tipo      | Descrição                                  |
| -------------- | --------- | ------------------------------------------ |
| Id             | int       | Identificador único do lote                |
| Codigo         | string    | Código do lote                             |
| Quantidade     | int       | Quantidade disponível no lote              |
| DataEntrada    | DateTime  | Data de entrada do lote no estoque         |
| DataVencimento | DateTime? | Data de vencimento do lote, quando existir |

A data de vencimento é opcional, pois alguns materiais escolares possuem validade, como cola, tinta e massa de modelar, enquanto outros não possuem, como caderno, lápis e régua.

---

### SaidaEstoque

A entidade `SaidaEstoque` representa a requisição para retirada de materiais do estoque.

| Atributo   | Tipo | Descrição                               |
| ---------- | ---- | --------------------------------------- |
| MaterialId | int  | ID do material que terá saída           |
| Quantidade | int  | Quantidade que será retirada do estoque |

---

## Endpoints da API

| Método | Rota                        | Descrição                            |
| ------ | --------------------------- | ------------------------------------ |
| GET    | `/`                         | Verifica se a API está funcionando   |
| GET    | `/api/materiais`            | Lista todos os materiais cadastrados |
| GET    | `/api/materiais/{id}`       | Busca um material pelo ID            |
| GET    | `/api/materiais/{id}/lotes` | Lista os lotes de um material        |
| GET    | `/api/materiais/ativos`     | Lista somente os materiais ativos    |
| GET    | `/api/materiais/inativos`   | Lista somente os materiais inativos  |
| POST   | `/api/materiais`            | Cadastra um novo material            |
| POST   | `/api/materiais/saida`      | Registra saída de estoque por lote   |
| DELETE | `/api/materiais/{id}`       | Remove um material pelo ID           |

---

## Como Executar o Back-end

### 1. Acessar a pasta do projeto

No terminal, acesse a pasta onde está o arquivo `.csproj`:

```bash
cd C:\Users\emily.garcia\WMS_API\ApiProdutos
```

---

### 2. Restaurar as dependências

```bash
dotnet restore
```

---

### 3. Executar a API

```bash
dotnet run
```

Após executar, será exibida uma mensagem parecida com:

```text
Now listening on: http://localhost:5181
```

Essa é a URL da API.

---

### 4. Acessar o Swagger

Com a API rodando, abra no navegador:

```text
http://localhost:5181/swagger
```

O Swagger permite visualizar e testar todas as rotas da API diretamente pelo navegador.

---

## Como Executar o Front-end

O front-end está dentro da pasta:

```text
frontend
```

Arquivos principais:

```text
frontend
├── index.html
├── style.css
└── script.js
```

---

### 1. Conferir a porta da API

No arquivo `script.js`, verifique se a constante `API_URL` está apontando para a porta correta da API:

```javascript
const API_URL = "http://localhost:5181";
```

Caso a API rode em outra porta, altere essa linha.

Exemplo:

```javascript
const API_URL = "http://localhost:5227";
```

---

### 2. Abrir com Live Server

No VS Code:

1. Clique com o botão direito no arquivo `index.html`;
2. Clique em **Open with Live Server**;
3. O navegador abrirá uma URL parecida com:

```text
http://127.0.0.1:5500/frontend/index.html
```

Importante: a API precisa continuar rodando no terminal com o comando:

```bash
dotnet run
```

---

## Como Usar o Sistema

### 1. Visualizar materiais cadastrados

Ao abrir o front-end, a tela exibe a seção **Materiais cadastrados**.

Nessa área são mostrados:

* Nome do material;
* ID;
* Categoria;
* Status ativo ou inativo;
* Estoque total;
* Lotes cadastrados;
* Quantidade por lote;
* Data de entrada;
* Data de vencimento, quando existir.

---

### 2. Filtrar materiais

Na seção **Materiais cadastrados**, existem três botões:

* **Todos**
* **Ativos**
* **Inativos**

Esses botões permitem filtrar os materiais exibidos na tela.

---

### 3. Cadastrar um material escolar

Na seção **Cadastrar material escolar**, preencha os seguintes campos:

#### Dados do material

* ID do material;
* Nome do material;
* Categoria;
* Status.

#### Dados do lote

* ID do lote;
* Código do lote;
* Quantidade em estoque;
* Data de entrada;
* Data de vencimento.

Depois clique em:

```text
Cadastrar material
```

Exemplo de cadastro:

```json
{
  "id": 4,
  "nome": "Apontador",
  "categoria": "Material de escrita",
  "ativo": true,
  "lotes": [
    {
      "id": 4,
      "codigo": "APO001",
      "quantidade": 80,
      "dataEntrada": "2026-03-01T00:00:00",
      "dataVencimento": null
    }
  ]
}
```

---

### 4. Registrar saída de estoque

Na seção **Registrar saída de estoque**:

1. Selecione o material desejado;
2. Informe a quantidade que será retirada;
3. Clique em **Registrar saída**.

Exemplo de requisição enviada para a API:

```json
{
  "materialId": 1,
  "quantidade": 10
}
```

Após registrar a saída, o sistema atualiza a quantidade disponível nos lotes do material.

---

## Regra de Saída por Lote

A saída de estoque segue uma lógica de controle por lote.

Quando o material possui data de vencimento, o sistema prioriza os lotes com vencimento mais próximo.

Essa lógica é conhecida como:

```text
FEFO - First Expire, First Out
```

Ou seja:

```text
Primeiro que vence, primeiro que sai.
```

Para materiais sem vencimento, o sistema utiliza a data de entrada do lote como critério de ordenação.

---

## Exemplos de Uso da API

### Verificar se a API está funcionando

Método:

```text
GET
```

Rota:

```text
/
```

Retorno esperado:

```text
API de Materiais Escolares funcionando!
```

---

### Listar todos os materiais

Método:

```text
GET
```

Rota:

```text
/api/materiais
```

Descrição:

Retorna todos os materiais escolares cadastrados.

---

### Buscar material por ID

Método:

```text
GET
```

Rota:

```text
/api/materiais/1
```

Caso o material exista, retorna os dados do material.

Caso não exista, retorna:

```text
Material não encontrado.
```

---

### Listar lotes de um material

Método:

```text
GET
```

Rota:

```text
/api/materiais/1/lotes
```

Descrição:

Retorna todos os lotes vinculados ao material informado.

---

### Listar materiais ativos

Método:

```text
GET
```

Rota:

```text
/api/materiais/ativos
```

Descrição:

Retorna somente os materiais em que o campo `Ativo` é igual a `true`.

---

### Listar materiais inativos

Método:

```text
GET
```

Rota:

```text
/api/materiais/inativos
```

Descrição:

Retorna somente os materiais em que o campo `Ativo` é igual a `false`.

---

### Cadastrar material

Método:

```text
POST
```

Rota:

```text
/api/materiais
```

Exemplo de corpo da requisição:

```json
{
  "id": 5,
  "nome": "Caneta Preta",
  "categoria": "Caneta",
  "ativo": true,
  "lotes": [
    {
      "id": 5,
      "codigo": "CANPRE001",
      "quantidade": 100,
      "dataEntrada": "2026-04-10T00:00:00",
      "dataVencimento": null
    }
  ]
}
```

---

### Registrar saída

Método:

```text
POST
```

Rota:

```text
/api/materiais/saida
```

Exemplo de corpo da requisição:

```json
{
  "materialId": 5,
  "quantidade": 20
}
```

Retorno esperado:

```json
{
  "mensagem": "Saída realizada com sucesso.",
  "material": "Caneta Preta",
  "quantidadeRetirada": 20,
  "lotesAtualizados": [
    {
      "id": 5,
      "codigo": "CANPRE001",
      "quantidade": 80,
      "dataEntrada": "2026-04-10T00:00:00",
      "dataVencimento": null
    }
  ]
}
```

---

### Remover material

Método:

```text
DELETE
```

Rota:

```text
/api/materiais/1
```

Retorno esperado em caso de sucesso:

```text
Material removido com sucesso.
```

Caso o material não exista:

```text
Material não encontrado.
```

---

## Organização do Código

### Models/MaterialEscolar.cs

Define a estrutura da entidade `MaterialEscolar`, contendo as informações principais do material, como ID, nome, categoria, status ativo e lista de lotes.

---

### Models/Lote.cs

Define a estrutura da entidade `Lote`, contendo informações como ID, código do lote, quantidade, data de entrada e data de vencimento.

---

### Models/SaidaEstoque.cs

Define a estrutura da requisição usada para registrar a saída de estoque de um material.

---

### Data/BancoSimulado.cs

Arquivo responsável por armazenar os dados simulados em memória.

Como o projeto não utiliza banco de dados, os materiais cadastrados ficam armazenados temporariamente em uma lista.

---

### Routes/ROTA_GET.cs

Contém as rotas de consulta geral da API:

* Rota raiz `/`;
* Listagem de todos os materiais;
* Consulta de material por ID;
* Consulta de lotes de um material.

---

### Routes/ROTA_GET_ATIVOS.cs

Contém a rota responsável por listar somente os materiais ativos.

Rota:

```text
GET /api/materiais/ativos
```

---

### Routes/ROTA_GET_INATIVOS.cs

Contém a rota responsável por listar somente os materiais inativos.

Rota:

```text
GET /api/materiais/inativos
```

---

### Routes/ROTA_POST.cs

Contém a rota responsável pelo cadastro de novos materiais escolares.

Rota:

```text
POST /api/materiais
```

---

### Routes/ROTA_DELETE.cs

Contém a rota responsável pela exclusão de materiais por ID.

Rota:

```text
DELETE /api/materiais/{id}
```

---

### Routes/ROTA_SAIDA.cs

Contém a rota responsável por registrar a saída de estoque por lote.

Rota:

```text
POST /api/materiais/saida
```

---

### Program.cs

Arquivo principal da aplicação.

Ele configura os serviços, ativa o Swagger, configura o CORS e registra todas as rotas da API.

As rotas são registradas por meio dos seguintes métodos:

```csharp
app.MapGetRoutes();
app.MapGetAtivosRoutes();
app.MapGetInativosRoutes();
app.MapPostRoutes();
app.MapDeleteRoutes();
app.MapSaidaRoutes();
```

---

## Observação sobre o Armazenamento

Este projeto utiliza dados simulados em memória.

Isso significa que os materiais cadastrados durante a execução da aplicação serão perdidos quando a API for encerrada ou reiniciada.

Em uma versão futura, a API poderá ser integrada a um banco de dados, como:

* SQL Server;
* PostgreSQL;
* MySQL;
* SQLite.

---

## Possíveis Melhorias Futuras

* Integração com banco de dados;
* Tela de edição de materiais;
* Cadastro de múltiplos lotes para o mesmo material;
* Histórico de saídas;
* Controle de usuários;
* Validação para impedir IDs duplicados;
* Dashboard com indicadores de estoque baixo;
* Alertas para lotes próximos do vencimento;
* Relatórios de movimentação de estoque;
* Autenticação e autorização.

---

## Justificativa Técnica

A API foi desenvolvida utilizando **ASP.NET Core Minimal API**, pois essa abordagem permite criar endpoints de forma simples, rápida e objetiva.

A equipe optou por separar as rotas em arquivos diferentes para melhorar a organização do código e facilitar a manutenção. Dessa forma, cada arquivo possui uma responsabilidade específica dentro do projeto.

Os dados foram armazenados em listas simuladas em memória, permitindo demonstrar o funcionamento dos endpoints sem a necessidade de configurar um banco de dados.

Também foi utilizado o **Swagger**, que facilita o teste das rotas diretamente pelo navegador e auxilia na documentação da API.

O front-end foi desenvolvido com **HTML, CSS e JavaScript puro**, permitindo consumir os endpoints da API por meio de requisições `fetch`.

A criação das entidades `MaterialEscolar` e `Lote` permite representar uma estrutura próxima de um sistema real de estoque, em que cada material pode possuir diferentes lotes, quantidades e datas de vencimento.

A rota de saída de estoque demonstra uma regra importante de sistemas de armazenagem: a baixa de estoque por lote, priorizando os itens com vencimento mais próximo.

---
