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
    public class AbrigoConfiguration : IEntityTypeConfiguration<Abrigo>
    {
        public void Configure(EntityTypeBuilder<Abrigo> builder)
        {
            builder.ToTable("tbl_abrigo");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                   .HasColumnName("id_abrigo")
                   .ValueGeneratedOnAdd();

            builder.Property(a => a.Nome)
                   .HasColumnName("nome")
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(a => a.Capacidade)
                   .HasColumnName("capacidade")
                   .IsRequired();

            builder.Property(a => a.Disponivel)
                   .HasColumnName("disponivel")
                   .HasColumnType("CHAR(1)")
                   .IsRequired();

            builder.Property(a => a.LocalizacaoId)
                   .HasColumnName("tbl_localizacao_id_localizacao")
                   .IsRequired();

            builder.HasOne(a => a.Localizacao)
                   .WithMany(l => l.Abrigos)
                   .HasForeignKey(a => a.LocalizacaoId)
                   .HasConstraintName("fk_abrigo_localizacao")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
