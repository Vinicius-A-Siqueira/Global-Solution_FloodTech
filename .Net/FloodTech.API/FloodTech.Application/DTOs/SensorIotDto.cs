using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Application.DTOs
{
    public class SensorIotDto
    {
        public int Id { get; set; }
        public required string TipoSensor { get; set; }
        public required string Modelo { get; set; }
        public required string LocalizacaoDescricao { get; set; }
        public int LocalizacaoId { get; set; }
    }
}