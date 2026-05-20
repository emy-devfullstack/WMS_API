using System;

namespace ApiProdutos.Models;

public class Lote
{
    public int Id { get; set; }

    public string Codigo { get; set; } = string.Empty;

    public int Quantidade { get; set; }

    public DateTime DataVencimento { get; set; }
}