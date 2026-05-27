# WMS - API de produtos de supermercado

## Descrição do Projeto

O **WMS - API de produtos de supermercado** é uma API desenvolvida em **ASP.NET Core Minimal API** com o objetivo de simular o gerenciamento de produtos em um sistema de estoque/armazém.

A aplicação permite consultar produtos, filtrar produtos ativos e inativos, cadastrar novos produtos e remover produtos existentes. Também foi implementada uma estrutura de lotes, permitindo que cada produto possua informações como código do lote, quantidade e data de vencimento.

---

## Integrantes

- Bruno Batista Xavier
- Emily Kristin Garcia
- Maria Eduarda Martins de Souza

---

## Objetivo

O objetivo do projeto é criar uma API backend simples e funcional para controle de produtos, simulando operações básicas de um sistema de estoque.

A API busca resolver a necessidade de:

- Listar produtos cadastrados;
- Consultar produtos por ID;
- Identificar produtos ativos;
- Identificar produtos inativos;
- Cadastrar novos produtos;
- Remover produtos;
- Organizar produtos por lotes e datas de vencimento.

---

## Tecnologias Utilizadas

- C#
- ASP.NET Core
- Minimal API
- Swagger
- .NET 10.0

---

## Estrutura do Projeto

WAREHOUSESYSTEM_BACKEND

Models  
- Lote.cs  
- Produto.cs  

Routes  
- ROTA_DELETE.cs  
- ROTA_GET.cs  
- ROTA_GET_ATIVOS.cs  
- ROTA_GET_INATIVOS.cs  
- ROTA_POST.cs  

Properties  
- launchSettings.json  

Arquivos principais  
- Program.cs  
- appsettings.json  
- appsettings.Development.json  
- ApiProdutos.csproj  

---

## Entidades do Sistema

### Produto

A entidade `Produto` representa o produto principal do sistema.

| Atributo | Tipo | Descrição |
|---|---|---|
| Id | int | Identificador único do produto |
| Nome | string | Nome do produto |
| Ativo | bool | Define se o produto está ativo ou inativo |
| Lotes | List<Lote> | Lista de lotes vinculados ao produto |

### Lote

A entidade `Lote` representa os lotes associados a um produto.

| Atributo | Tipo | Descrição |
|---|---|---|
| Id | int | Identificador único do lote |
| Codigo | string | Código do lote |
| Quantidade | int | Quantidade de itens no lote |
| DataVencimento | DateTime | Data de vencimento do lote |

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/{id}` | Busca um produto pelo ID |
| GET | `/api/produtos/ativos` | Lista somente os produtos ativos |
| GET | `/api/produtos/inativos` | Lista somente os produtos inativos |
| POST | `/api/produtos` | Cadastra um novo produto |
| DELETE | `/api/produtos/{id}` | Remove um produto pelo ID |

---

## Como Executar o Projeto

### 1. Clonar o repositório

```text
git clone [URL_DO_REPOSITORIO]
```

### 2. Acessar a pasta do projeto

```text
cd WAREHOUSESYSTEM_BACKEND
```

### 3. Restaurar as dependências

```text
dotnet restore
```

### 4. Executar a aplicação

```text
dotnet run
```

### 5. Acessar o Swagger

Após executar o projeto, acesse no navegador:

```text
https://localhost:PORTA/swagger
```

ou

```text
http://localhost:PORTA/swagger
```

A porta pode variar conforme a configuração do arquivo `launchSettings.json`.

---

## Exemplos de Uso

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
API de Produtos funcionando!
```

---

### Listar todos os produtos

Método:

```text
GET
```

Rota:

```text
/api/produtos
```

Descrição:

Retorna todos os produtos cadastrados na lista simulada, ordenados pela menor data de vencimento dos lotes.

---

### Buscar produto por ID

Método:

```text
GET
```

Rota:

```text
/api/produtos/1
```

Caso o produto exista, retorna os dados do produto.

Caso não exista, retorna:

```text
Produto não encontrado.
```

---

### Listar produtos ativos

Método:

```text
GET
```

Rota:

```text
/api/produtos/ativos
```

Descrição:

Retorna somente os produtos em que o campo `Ativo` é igual a `true`.

---

### Listar produtos inativos

Método:

```text
GET
```

Rota:

```text
/api/produtos/inativos
```

Descrição:

Retorna somente os produtos em que o campo `Ativo` é igual a `false`.

---

### Cadastrar produto

Método:

```text
POST
```

Rota:

```text
/api/produtos
```

Exemplo de corpo da requisição:

```json
{
  "id": 4,
  "nome": "Macarrão",
  "ativo": true,
  "lotes": [
    {
      "id": 4,
      "codigo": "MC001",
      "quantidade": 60,
      "dataVencimento": "2026-08-20T00:00:00"
    }
  ]
}
```

---

### Remover produto

Método:

```text
DELETE
```

Rota:

```text
/api/produtos/1
```

Retorno esperado em caso de sucesso:

```text
Produto removido com sucesso.
```

Caso o produto não exista:

```text
Produto não encontrado.
```

---

## Organização do Código

### Models/Produto.cs

Define a estrutura da entidade `Produto`, contendo as informações principais do produto, como ID, nome, status ativo e lista de lotes.

### Models/Lote.cs

Define a estrutura da entidade `Lote`, contendo informações como ID, código do lote, quantidade e data de vencimento.

### Routes/ROTA_GET.cs

Contém as rotas de consulta geral da API:

- Rota raiz `/`;
- Listagem de todos os produtos;
- Consulta de produto por ID.

### Routes/ROTA_GET_ATIVOS.cs

Contém a rota responsável por listar somente os produtos ativos.

Rota:

```text
GET /api/produtos/ativos
```

### Routes/ROTA_GET_INATIVOS.cs

Contém a rota responsável por listar somente os produtos inativos.

Rota:

```text
GET /api/produtos/inativos
```

### Routes/ROTA_POST.cs

Contém a rota responsável pelo cadastro de novos produtos.

Rota:

```text
POST /api/produtos
```

### Routes/ROTA_DELETE.cs

Contém a rota responsável pela exclusão de produtos por ID.

Rota:

```text
DELETE /api/produtos/{id}
```

### Program.cs

Arquivo principal da aplicação. Ele configura os serviços, ativa o Swagger e registra todas as rotas da API.

As rotas são registradas no `Program.cs` por meio dos seguintes métodos:

```csharp
app.MapGetRoutes();
app.MapGetAtivosRoutes();
app.MapGetInativosRoutes();
app.MapPostRoutes();
app.MapDeleteRoutes();
```

---

## Justificativa Técnica

A API foi desenvolvida utilizando **ASP.NET Core Minimal API**, pois essa abordagem permite criar endpoints de forma simples, rápida e objetiva.

A equipe optou por separar as rotas em arquivos diferentes para melhorar a organização do código e facilitar a manutenção. Dessa forma, cada arquivo possui uma responsabilidade específica dentro do projeto.

Os dados foram armazenados em listas simuladas em memória, permitindo demonstrar o funcionamento dos endpoints sem a necessidade de configurar um banco de dados.

Também foi utilizado o **Swagger**, que facilita o teste das rotas diretamente pelo navegador e auxilia na documentação da API.

A criação das entidades `Produto` e `Lote` permite representar uma estrutura próxima de um sistema real de estoque, em que cada produto pode possuir diferentes lotes, quantidades e datas de vencimento.

---

## Observação

Este projeto utiliza dados simulados em memória. Portanto, ao reiniciar a aplicação, os dados cadastrados durante a execução podem ser perdidos.

Em uma versão futura, a API poderá ser integrada a um banco de dados, como SQL Server, PostgreSQL ou MySQL.
