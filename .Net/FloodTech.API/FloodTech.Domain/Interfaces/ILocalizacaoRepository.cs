using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;

namespace FloodTech.Domain.Interfaces
{
    public interface ILocalizacaoRepository
    {
        Task<IEnumerable<Localizacao>> GetAllAsync();
        Task<Localizacao> GetByIdAsync(int id);
        Task<Localizacao> AddAsync(Localizacao localizacao);
        Task<Localizacao> UpdateAsync(Localizacao localizacao);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Localizacao>> BuscarPorCidadeAsync(string cidade);
    }
}