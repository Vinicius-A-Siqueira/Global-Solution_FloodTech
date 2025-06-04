using FloodTech.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Application.DTOs
{
    public class RotaSeguraDto
    {
        public int Id { get; set; }
        public decimal TempoEstimado { get; set; }
        public char Bloqueada { get; set; }
        public int OrigemLocalizacaoId { get; set; }
        public int DestinoLocalizacaoId { get; set; }
        public LocalizacaoDto OrigemLocalizacao { get; set; }
        public LocalizacaoDto DestinoLocalizacao { get; set; }
    }
}
