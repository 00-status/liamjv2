using Microsoft.AspNetCore.Rewrite;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

RewriteOptions rewriteOptions = new RewriteOptions().AddRewrite("/*/", "index.html", true);

app.UseRewriter(rewriteOptions);
app.UseRouting();

app.Run();
