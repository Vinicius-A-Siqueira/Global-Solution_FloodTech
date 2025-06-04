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
    public class SensorIotService : ISensorIotService
    {
        private readonly ISensorIotRepository _repo;

        public SensorIotService(ISensorIotRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<SensorIot>> ListarTodosAsync() => await _repo.GetAllAsync();

        public async Task<SensorIot> BuscarPorIdAsync(int id) => await _repo.GetByIdAsync(id);

        public async Task<SensorIot> CriarAsync(SensorIot sensor) => await _repo.AddAsync(sensor);

        public async Task<SensorIot> AtualizarAsync(SensorIot sensor) => await _repo.UpdateAsync(sensor);

        public async Task<bool> RemoverAsync(int id) => await _repo.DeleteAsync(id);

        public async Task<IEnumerable<SensorIot>> BuscarPorNivelAguaAsync(decimal minimo, decimal maximo) =>
            await _repo.BuscarPorNivelAguaAsync(minimo, maximo);
    }
}

