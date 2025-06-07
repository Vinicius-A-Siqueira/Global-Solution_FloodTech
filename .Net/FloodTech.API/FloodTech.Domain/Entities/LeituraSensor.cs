using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Domain.Entities
{
    [Table("TBL_LEITURA_SENSOR")]
    public class LeituraSensor
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public decimal Valor { get; set; }

        public int SensorIotId { get; set; }
        public SensorIot SensorIot { get; set; } = null!;
    }
}
