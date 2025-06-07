using FloodTech.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Application.DTOs
{
    public class AbrigoDto
    {
        public int Id { get; set; }
        public required string Nome { get; set; } 
        public int Capacidade { get; set; }
        public char Disponivel { get; set; } 
        public int LocalizacaoId { get; set; }
            
        public required LocalizacaoDto Localizacao { get; set; } 
    }
}
