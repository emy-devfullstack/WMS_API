using ApiProdutos.Models;

namespace ApiProdutos.Routes;

public static class ROTA_GET_INATIVOS
{
    public static void MapGetInativosRoutes(this WebApplication app)
    {
        List<Produto> produtos = new List<Produto>()
        {
            new Produto { Id = 1, Nome = "Leite", Ativo = true },
            new Produto { Id = 2, Nome = "Arroz", Ativo = true },
            new Produto { Id = 3, Nome = "Feijão", Ativo = false }
        };

        // GET inativos
        app.MapGet("/api/produtos/inativos", () =>
        {
            var inativos = produtos.Where(p => !p.Ativo);

            return Results.Ok(inativos);
        });
    }
}