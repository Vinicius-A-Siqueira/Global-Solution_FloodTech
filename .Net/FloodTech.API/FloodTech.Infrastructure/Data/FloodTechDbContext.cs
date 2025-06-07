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
        public DbSet<SensorIot> Sensores { get; set; }
        public DbSet<RotaSegura> Rotas { get; set; }
        public DbSet<LeituraSensor> Leituras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
       
        modelBuilder.HasDefaultSchema("RM551939");

            
       

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FloodTechDbContext).Assembly);
        }
    }
}
