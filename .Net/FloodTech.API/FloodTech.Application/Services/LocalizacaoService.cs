using FloodTech.Domain.Entities;
using FloodTech.Domain.Interfaces;
using FloodTech.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FloodTech.Application.Services
{
    public class LocalizacaoService : ILocalizacaoService
    {
        private readonly ILocalizacaoRepository _repo;

        public LocalizacaoService(ILocalizacaoRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Localizacao>> ListarTodosAsync() => await _repo.GetAllAsync();

        public async Task<Localizacao> BuscarPorIdAsync(int id) => await _repo.GetByIdAsync(id);

        public async Task<Localizacao> CriarAsync(Localizacao localizacao) => await _repo.AddAsync(localizacao);

        public async Task<Localizacao> AtualizarAsync(Localizacao localizacao) => await _repo.UpdateAsync(localizacao);

        public async Task<bool> RemoverAsync(int id) => await _repo.DeleteAsync(id);

        public async Task<IEnumerable<Localizacao>> BuscarPorCidadeAsync(string cidade) =>
            await _repo.BuscarPorCidadeAsync(cidade);
    }
}
