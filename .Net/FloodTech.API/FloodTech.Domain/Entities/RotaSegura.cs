using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations.Schema;

namespace FloodTech.Domain.Entities
{

    [Table("TBL_ROTA_SEGURA")]
    public class RotaSegura
    {
        public int Id { get; set; }
        public decimal TempoEstimado { get; set; }
        public string Bloqueada { get; set; }
        public int IdOrigemLocalizacao { get; set; }
        public int IdDestinoLocalizacao { get; set; }

        [ForeignKey("IdOrigemLocalizacao")]
        public Localizacao OrigemLocalizacao { get; set; }

        [ForeignKey("IdDestinoLocalizacao")]
        public Localizacao DestinoLocalizacao { get; set; }

        public RotaSegura() { }

        public RotaSegura(
            decimal tempoEstimado,
            string bloqueada,
            int idOrigemLocalizacao,
            int idDestinoLocalizacao)
        {
            TempoEstimado = tempoEstimado;
            Bloqueada = bloqueada;
            IdOrigemLocalizacao = idOrigemLocalizacao;
            IdDestinoLocalizacao = idDestinoLocalizacao;
        }
    }
}
