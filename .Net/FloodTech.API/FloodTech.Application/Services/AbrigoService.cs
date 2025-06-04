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
    public class AbrigoService : IAbrigoService
    {
        private readonly IAbrigoRepository _abrigoRepository;

        public AbrigoService(IAbrigoRepository abrigoRepository)
        {
            _abrigoRepository = abrigoRepository;
        }

        public async Task<IEnumerable<Abrigo>> ListarTodosAsync() => await _abrigoRepository.GetAllAsync();

        public async Task<Abrigo> BuscarPorIdAsync(int id) => await _abrigoRepository.GetByIdAsync(id);

        public async Task<Abrigo> CriarAsync(Abrigo abrigo) => await _abrigoRepository.AddAsync(abrigo);

        public async Task<Abrigo> AtualizarAsync(Abrigo abrigo) => await _abrigoRepository.UpdateAsync(abrigo);

        public async Task<bool> RemoverAsync(int id) => await _abrigoRepository.DeleteAsync(id);

        public async Task<IEnumerable<Abrigo>> BuscarPorCapacidadeAsync(int capacidadeMinima) =>
            await _abrigoRepository.BuscarAbrigadosPorCapacidadeMinimaAsync(capacidadeMinima);
    }
}