using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Domain.Entities
{
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
    }
}

