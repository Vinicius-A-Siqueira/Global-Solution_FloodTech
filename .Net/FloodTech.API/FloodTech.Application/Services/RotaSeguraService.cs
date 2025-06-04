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
    public class RotaSeguraService : IRotaSeguraService
    {
        private readonly IRotaSeguraRepository _repo;

        public RotaSeguraService(IRotaSeguraRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<RotaSegura>> ListarTodasAsync() => await _repo.GetAllAsync();

        public async Task<RotaSegura> BuscarPorIdAsync(int id) => await _repo.GetByIdAsync(id);

        public async Task<RotaSegura> CriarAsync(RotaSegura rota) => await _repo.AddAsync(rota);

        public async Task<RotaSegura> AtualizarAsync(RotaSegura rota) => await _repo.UpdateAsync(rota);

        public async Task<bool> RemoverAsync(int id) => await _repo.DeleteAsync(id);

        public async Task<IEnumerable<RotaSegura>> BuscarPorPontosAsync(int origemId, int destinoId) =>
            await _repo.BuscarRotasEntrePontosAsync(origemId, destinoId);
    }
}