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
        public string TipoSensor { get; set; }
        public string Modelo { get; set; }
        public string LocalizacaoDescricao { get; set; }
        public int LocalizacaoId { get; set; }
    }
}