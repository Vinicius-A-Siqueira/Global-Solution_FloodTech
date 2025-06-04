using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;


namespace FloodTech.Domain.Interfaces
{
    public interface IRotaSeguraRepository
    {
        Task<IEnumerable<RotaSegura>> GetAllAsync();
        Task<RotaSegura> GetByIdAsync(int id);
        Task<RotaSegura> AddAsync(RotaSegura rota);
        Task<RotaSegura> UpdateAsync(RotaSegura rota);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<RotaSegura>> BuscarRotasEntrePontosAsync(int origemId, int destinoId);
        Task<IEnumerable<RotaSegura>> BuscarRotasPorDistanciaMaximaAsync(double distanciaMaximaKm);
    }
}