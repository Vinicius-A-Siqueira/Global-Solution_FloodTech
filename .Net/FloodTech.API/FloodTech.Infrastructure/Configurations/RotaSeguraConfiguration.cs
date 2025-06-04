using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FloodTech.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FloodTech.Infrastructure.Configurations
{
    public class RotaSeguraConfiguration : IEntityTypeConfiguration<RotaSegura>
    {
        public void Configure(EntityTypeBuilder<RotaSegura> builder)
        {
            builder.ToTable("tbl_rota_segura");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                   .HasColumnName("id_rota")
                   .ValueGeneratedOnAdd();

            builder.Property(r => r.TempoEstimado)
                   .HasColumnName("tempo_estimado")
                   .HasPrecision(5, 2)
                   .IsRequired();

            builder.Property(r => r.Bloqueada)
                   .HasColumnName("bloqueada")
                   .HasColumnType("CHAR(1)")
                   .IsRequired();

            builder.Property(r => r.IdOrigemLocalizacao)
                   .HasColumnName("id_origem_localizacao")
                   .IsRequired();

            builder.Property(r => r.IdDestinoLocalizacao)
                   .HasColumnName("id_destino_localizacao")
                   .IsRequired();

            builder.HasOne(r => r.OrigemLocalizacao)
                   .WithMany()
                   .HasForeignKey(r => r.IdOrigemLocalizacao)
                   .HasConstraintName("fk_rota_origem")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(r => r.DestinoLocalizacao)
                   .WithMany()
                   .HasForeignKey(r => r.IdDestinoLocalizacao)
                   .HasConstraintName("fk_rota_destino")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
