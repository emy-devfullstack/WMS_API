using ApiProdutos.Models;

namespace ApiProdutos.Routes;

public static class ROTA_POST
{
    public static void MapPostRoutes(this WebApplication app)
    {
        List<Produto> produtos = new List<Produto>();

        // POST produto
        app.MapPost("/api/produtos", (Produto produto) =>
        {
            produtos.Add(produto);

            return Results.Created(
                $"/api/produtos/{produto.Id}",
                produto
            );
        });
    }
}