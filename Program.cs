var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
    policy.WithOrigins("https://YOUR-GITHUB-USERNAME.github.io")
          .AllowAnyHeader()
          .AllowAnyMethod()));

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors();

app.MapGet("/api/creator", () => Results.Ok(new
{
    name = "Nathi / Jay",
    location = "South Africa",
    instagram = "@jay.ma._",
    tiktok = "@jaeh___",
    topTikTokReach = "174.2K+"
}));

app.MapPost("/api/contact", (ContactRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
        return Results.BadRequest(new { message = "Name and email are required." });

    // Add email-provider integration here when you are ready.
    return Results.Ok(new { message = "Thanks — your brief was received." });
});

app.Run();

record ContactRequest(string Name, string Email, string? Brand, string? Message);
