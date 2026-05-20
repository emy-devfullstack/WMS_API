using System;
using System.Collections.Generic;

namespace ApiProdutos.Models;

public class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public bool Ativo { get; set; }

    public List<Lote> Lotes { get; set; } = new();
}