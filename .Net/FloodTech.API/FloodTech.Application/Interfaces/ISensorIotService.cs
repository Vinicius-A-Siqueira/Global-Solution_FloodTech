using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Entities;

namespace FloodTech.Application.Interfaces
{
    public interface ISensorIotService
    {
        Task<IEnumerable<SensorIot>> ListarTodosAsync();
        Task<SensorIot> BuscarPorIdAsync(int id);
        Task<SensorIot> CriarAsync(SensorIot sensor);
        Task<SensorIot> AtualizarAsync(SensorIot sensor);
        Task<bool> RemoverAsync(int id);
        Task<IEnumerable<SensorIot>> BuscarPorNivelAguaAsync(decimal minimo, decimal maximo);
    }
}