using ApiProdutos.Models;

namespace ApiProdutos.Routes;

public static class ROTA_DELETE
{
    public static void MapDeleteRoutes(this WebApplication app)
    {
        List<Produto> produtos = new List<Produto>()
        {
            new Produto { Id = 1, Nome = "Leite" },
            new Produto { Id = 2, Nome = "Arroz" }
        };

        // DELETE produto
        app.MapDelete("/api/produtos/{id}", (int id) =>
        {
            var produto = produtos.FirstOrDefault(p => p.Id == id);

            if (produto == null)
            {
                return Results.NotFound("Produto não encontrado.");
            }

            produtos.Remove(produto);

            return Results.Ok("Produto removido com sucesso.");
        });
    }
}