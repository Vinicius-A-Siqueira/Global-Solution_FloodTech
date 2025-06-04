using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Entities;

namespace FloodTech.Application.Interfaces
{
    public interface IRotaSeguraService
    {
        Task<IEnumerable<RotaSegura>> ListarTodasAsync();
        Task<RotaSegura> BuscarPorIdAsync(int id);
        Task<RotaSegura> CriarAsync(RotaSegura rota);
        Task<RotaSegura> AtualizarAsync(RotaSegura rota);
        Task<bool> RemoverAsync(int id);
        Task<IEnumerable<RotaSegura>> BuscarPorPontosAsync(int origemId, int destinoId);
    }
}
