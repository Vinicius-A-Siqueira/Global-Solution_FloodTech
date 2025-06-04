using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FloodTech.Infrastructure.Data
{
    public class FloodTechDbContext : DbContext
    {
        public FloodTechDbContext(DbContextOptions<FloodTechDbContext> options) : base(options)
        {
        }

        // DbSets para cada entidade
        public DbSet<Localizacao> Localizacoes { get; set; }
        public DbSet<Abrigo> Abrigos { get; set; }
        public DbSet<SensorIot> SensorsIot { get; set; }
        public DbSet<RotaSegura> RotasSeguras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Aqui você pode aplicar configurações específicas usando Fluent API
            // Por exemplo, aplicar configurações via classes separadas:
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(FloodTechDbContext).Assembly);
        }
    }
}
