using ApiProdutos.Models;

namespace ApiProdutos.Data;

public static class BancoSimulado
{
    public static List<MaterialEscolar> Materiais = new()
    {
        new MaterialEscolar
        {
            Id = 1,
            Nome = "Caderno Universitário",
            Categoria = "Caderno",
            Ativo = true,
            Lotes = new List<Lote>
            {
                new Lote
                {
                    Id = 1,
                    Codigo = "CAD001",
                    Quantidade = 50,
                    DataEntrada = new DateTime(2026, 1, 10),
                    DataVencimento = null
                }
            }
        },
        new MaterialEscolar
        {
            Id = 2,
            Nome = "Cola Branca",
            Categoria = "Cola",
            Ativo = true,
            Lotes = new List<Lote>
            {
                new Lote
                {
                    Id = 2,
                    Codigo = "COL001",
                    Quantidade = 30,
                    DataEntrada = new DateTime(2026, 1, 15),
                    DataVencimento = new DateTime(2027, 5, 20)
                }
            }
        },
        new MaterialEscolar
        {
            Id = 3,
            Nome = "Caneta Azul",
            Categoria = "Caneta",
            Ativo = false,
            Lotes = new List<Lote>
            {
                new Lote
                {
                    Id = 3,
                    Codigo = "CAN001",
                    Quantidade = 100,
                    DataEntrada = new DateTime(2026, 2, 10),
                    DataVencimento = null
                }
            }
        }
    };
}