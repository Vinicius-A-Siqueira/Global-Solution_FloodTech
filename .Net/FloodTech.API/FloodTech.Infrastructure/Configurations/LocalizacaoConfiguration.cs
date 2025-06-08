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
    public class LocalizacaoConfiguration : IEntityTypeConfiguration<Localizacao>
    {
        public void Configure(EntityTypeBuilder<Localizacao> builder)
        {
            builder.ToTable("tbl_localizacao");

            builder.HasKey(l => l.Id);

            builder.Property(l => l.Id)
                   .HasColumnName("id_localizacao")
                   .ValueGeneratedOnAdd();

            builder.Property(l => l.Latitude)
                   .HasColumnName("latitude")
                   .HasPrecision(9, 6)
                   .IsRequired();

            builder.Property(l => l.Longitude)
                   .HasColumnName("longitude")
                   .HasPrecision(9, 6)
                   .IsRequired();

            builder.Property(l => l.Bairro)
                   .HasColumnName("bairro")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(l => l.Cidade)
                   .HasColumnName("cidade")
                   .HasMaxLength(30)
                   .IsRequired();

            builder.Property(l => l.Estado)
                   .HasColumnName("estado")
                   .HasMaxLength(2)
                   .IsRequired();

            builder.Property(l => l.Cep)
                   .HasColumnName("cep")
                   .HasMaxLength(10)
                   .IsRequired();

            builder.HasMany(l => l.Abrigos)
                   .WithOne(a => a.Localizacao)
                   .HasForeignKey(a => a.LocalizacaoId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(l => l.SensorsIot)
                   .WithOne(s => s.Localizacao)
                   .HasForeignKey(s => s.LocalizacaoId)
                   .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
