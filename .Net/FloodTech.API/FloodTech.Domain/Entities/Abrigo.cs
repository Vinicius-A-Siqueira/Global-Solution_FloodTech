using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Domain.Entities
{
    public class Abrigo : BaseEntity
    {
        public string Nome { get; set; }
        public int Capacidade { get; set; }
        public bool Disponivel { get; set; } 

        public int LocalizacaoId { get; set; }
        public Localizacao Localizacao { get; set; }
    }
}