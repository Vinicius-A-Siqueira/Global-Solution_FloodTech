using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations.Schema;

namespace FloodTech.Domain.Entities
{
    public class RotaSegura
    {
        public int Id { get; set; }

        public decimal TempoEstimado { get; set; }

        public string Bloqueada { get; set; } = null!;

        public int IdOrigemLocalizacao { get; set; }

        public int IdDestinoLocalizacao { get; set; }

        [ForeignKey(nameof(IdOrigemLocalizacao))]
        public Localizacao OrigemLocalizacao { get; set; } = null!;

        [ForeignKey(nameof(IdDestinoLocalizacao))]
        public Localizacao DestinoLocalizacao { get; set; } = null!;
    }
}
