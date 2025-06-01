using Microsoft.EntityFrameworkCore;
using ResumeSite.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("RESUMESITECONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("RESUMESITECONNECTIONSTRING");
}
builder.Services.AddDbContext<ResumeDbContext>(options => options.UseSqlServer(connection, sqlOptions =>
{
    sqlOptions.CommandTimeout(120);
    sqlOptions.EnableRetryOnFailure(
        maxRetryCount: 5,
        maxRetryDelay: TimeSpan.FromSeconds(10),
        errorNumbersToAdd: null);
}));
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddHealthChecks()
    .AddSqlServer(connection, name: "ResumeDbContext", tags: new[] { "db" });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(builder.Configuration["FrontendOrigin"])
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("FrontendPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapHealthChecks("/health");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
