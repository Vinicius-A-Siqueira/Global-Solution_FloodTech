using FloodTech.Application.Services;
using FloodTech.Application.Interfaces;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Interfaces;
using FloodTech.Infrastructure.Configurations;
using FloodTech.Infrastructure.Data;
using FloodTech.Infrastructure.Repositories;
using FloodTech.Infrastructure.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FloodTech.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<OracleSettings>(configuration.GetSection("OracleSettings"));

            var oracleSettings = configuration.GetSection("OracleSettings").Get<OracleSettings>();

            if (oracleSettings == null || string.IsNullOrWhiteSpace(oracleSettings.ConnectionString))
            {
                throw new Exception("Configuração 'OracleSettings.ConnectionString' não encontrada no appsettings.json");
            }

            services.AddDbContext<FloodTechDbContext>(options =>
                options.UseOracle(oracleSettings.ConnectionString));

            services.AddScoped<ILocalizacaoRepository, LocalizacaoRepository>();
            services.AddScoped<IAbrigoRepository, AbrigoRepository>();
            services.AddScoped<ISensorIotRepository, SensorIotRepository>();
            services.AddScoped<IRotaSeguraRepository, RotaSeguraRepository>();

            services.AddScoped<ILocalizacaoService, LocalizacaoService>();
            services.AddScoped<IAbrigoService, AbrigoService>();
            services.AddScoped<ISensorIotService, SensorIotService>();
            services.AddScoped<IRotaSeguraService, RotaSeguraService>();

            return services;
        }
    }
}
