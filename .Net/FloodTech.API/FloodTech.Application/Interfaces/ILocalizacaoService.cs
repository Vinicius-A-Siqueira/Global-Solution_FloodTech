using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Entities;

namespace FloodTech.Application.Interfaces
{
    public interface ILocalizacaoService
    {
        Task<IEnumerable<Localizacao>> ListarTodosAsync();
        Task<Localizacao> BuscarPorIdAsync(int id);
        Task<Localizacao> CriarAsync(Localizacao localizacao);
        Task<Localizacao> AtualizarAsync(Localizacao localizacao);
        Task<bool> RemoverAsync(int id);
        Task<IEnumerable<Localizacao>> BuscarPorCidadeAsync(string cidade);
    }
}