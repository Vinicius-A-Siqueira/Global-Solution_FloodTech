using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Domain.Entities
{
    [Table("TBL_LOCALIZACAO")]
    public class Localizacao
    {
        public int Id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }

        public ICollection<Abrigo> Abrigos { get; set; } = new List<Abrigo>();
        public ICollection<SensorIot> SensorsIot { get; set; } = new List<SensorIot>();

        public Localizacao(
            decimal latitude,
            decimal longitude,
            string bairro,
            string cidade,
            string estado,
            string cep)
        {
            Latitude = latitude;
            Longitude = longitude;
            Bairro = bairro ?? throw new ArgumentNullException(nameof(bairro));
            Cidade = cidade ?? throw new ArgumentNullException(nameof(cidade));
            Estado = estado ?? throw new ArgumentNullException(nameof(estado));
            Cep = cep ?? throw new ArgumentNullException(nameof(cep));
        }
    }
}

