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
            builder.ToTable("TBL_ABRIGO", "RM551939");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                   .HasColumnName("ID_ABRIGO")
                   .ValueGeneratedOnAdd();

            builder.Property(a => a.Nome)
                   .HasColumnName("NOME")
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(a => a.Capacidade)
                   .HasColumnName("CAPACIDADE")
                   .IsRequired();

            builder.Property(a => a.Disponivel)
                   .HasColumnName("DISPONIVEL")
                   .HasConversion(
                        v => v ? "Y" : "N",
                        v => v == "Y");
        

            builder.Property(a => a.LocalizacaoId)
                   .HasColumnName("TBL_LOCALIZACAO_ID_LOCALIZACAO")
                   .IsRequired();

            builder.HasOne(a => a.Localizacao)
                   .WithMany(l => l.Abrigos)
                   .HasForeignKey(a => a.LocalizacaoId)
                   .HasConstraintName("fk_abrigo_localizacao")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
