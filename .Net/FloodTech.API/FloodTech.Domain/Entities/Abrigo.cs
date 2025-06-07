    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace FloodTech.Domain.Entities
    {
        [Table("TBL_ABRIGO", Schema = "RM551939")]
        public class Abrigo : BaseEntity
        {
            [Column("NOME")]
            public string Nome { get; set; }

            [Column("CAPACIDADE")]
            public int Capacidade { get; set; }

            [Column("DISPONIVEL")]
            public bool Disponivel { get; set; }

            [Column("TBL_LOCALIZACAO_ID_LOCALIZACAO")]
            public int LocalizacaoId { get; set; }

            [ForeignKey("LocalizacaoId")]
            public virtual Localizacao Localizacao { get; set; }

        public Abrigo() { }

            public Abrigo(
                string nome,
                int capacidade,
                bool disponivel,
                int localizacaoId)
            {
                Nome = nome ?? throw new ArgumentNullException(nameof(nome));
                Capacidade = capacidade;
                Disponivel = disponivel;
                LocalizacaoId = localizacaoId;
            }
        }
    }