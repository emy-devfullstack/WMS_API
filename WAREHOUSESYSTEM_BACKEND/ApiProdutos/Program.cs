using ApiProdutos.Routes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI();

app.MapGetRoutes();

app.MapGetAtivosRoutes();

app.MapGetInativosRoutes();

app.MapPostRoutes();

app.MapDeleteRoutes();

app.Run();