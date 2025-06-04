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
    public class SensorIotConfiguration : IEntityTypeConfiguration<SensorIot>
    {
        public void Configure(EntityTypeBuilder<SensorIot> builder)
        {
            builder.ToTable("tbl_sensor_iot");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Id)
                   .HasColumnName("id_sensor")
                   .ValueGeneratedOnAdd();

            builder.Property(s => s.TipoSensor)
                   .HasColumnName("tipo_sensor")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(s => s.Modelo)
                   .HasColumnName("modelo")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(s => s.LocalizacaoDescricao)
                   .HasColumnName("localizacao")
                   .HasMaxLength(150)
                   .IsRequired();

            builder.Property(s => s.LocalizacaoId)
                   .HasColumnName("tbl_localizacao_id_localizacao")
                   .IsRequired();

            builder.HasOne(s => s.Localizacao)
                   .WithMany(l => l.SensorsIot)
                   .HasForeignKey(s => s.LocalizacaoId)
                   .HasConstraintName("fk_sensor_localizacao")
                   .OnDelete(DeleteBehavior.Restrict);

            // CHECK constraint não pode ser configurada via Fluent API diretamente
            // Deve ser criada via script SQL na migration ou manualmente no banco
        }
    }
}
