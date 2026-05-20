using ApiProdutos.Models;

namespace ApiProdutos.Routes;

public static class ROTA_GET
{
    public static void MapGetRoutes(this WebApplication app)
    {
        // Lista simulada
        List<Produto> produtos = new List<Produto>()
        {
            new Produto
            {
                Id = 1,
                Nome = "Leite Integral",
                Ativo = true,
                Lotes = new List<Lote>()
                {
                    new Lote
                    {
                        Id = 1,
                        Codigo = "LT001",
                        Quantidade = 50,
                        DataVencimento = new DateTime(2026, 05, 25)
                    }
                }
            },

            new Produto
            {
                Id = 2,
                Nome = "Arroz",
                Ativo = true,
                Lotes = new List<Lote>()
                {
                    new Lote
                    {
                        Id = 2,
                        Codigo = "AR001",
                        Quantidade = 100,
                        DataVencimento = new DateTime(2026, 07, 10)
                    }
                }
            },

            new Produto
            {
                Id = 3,
                Nome = "Feijão",
                Ativo = false,
                Lotes = new List<Lote>()
                {
                    new Lote
                    {
                        Id = 3,
                        Codigo = "FJ001",
                        Quantidade = 80,
                        DataVencimento = new DateTime(2026, 06, 15)
                    }
                }
            }
        };

        // GET raiz
        app.MapGet("/", () => "API de Produtos funcionando!");

        // GET todos
        app.MapGet("/api/produtos", () =>
        {
            var ordenados = produtos
                .OrderBy(p => p.Lotes.Min(l => l.DataVencimento));

            return Results.Ok(ordenados);
        });

        // GET por ID
        app.MapGet("/api/produtos/{id}", (int id) =>
        {
            var produto = produtos.FirstOrDefault(p => p.Id == id);

            return produto != null
                ? Results.Ok(produto)
                : Results.NotFound("Produto não encontrado.");
        });
    }
}