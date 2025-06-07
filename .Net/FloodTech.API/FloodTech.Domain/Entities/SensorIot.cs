using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Domain.Entities
{
    public enum TipoSensor
    {
        UMIDADE,
        NIVEL,
        IMAGEM
    }

    [Table("TBL_SENSOR_IOT")]
    public class SensorIot
    {
        public int Id { get; set; }
        public string TipoSensor { get; set; }
        public string Modelo { get; set; }
        public string LocalizacaoDescricao { get; set; }
        public int LocalizacaoId { get; set; }
        public Localizacao Localizacao { get; set; }

        public ICollection<LeituraSensor> Leituras { get; set; } = new List<LeituraSensor>();

        protected SensorIot()
        {
        }

        public SensorIot(
            string tipoSensor,
            string modelo,
            string localizacaoDescricao,
            int localizacaoId)
        {
            TipoSensor = tipoSensor ?? throw new ArgumentNullException(nameof(tipoSensor));
            Modelo = modelo ?? throw new ArgumentNullException(nameof(modelo));
            LocalizacaoDescricao = localizacaoDescricao ?? throw new ArgumentNullException(nameof(localizacaoDescricao));
            LocalizacaoId = localizacaoId;
        }
    }
}
