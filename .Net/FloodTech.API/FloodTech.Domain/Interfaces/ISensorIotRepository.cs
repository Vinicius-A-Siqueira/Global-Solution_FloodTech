using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;

namespace FloodTech.Domain.Interfaces
{
    public interface ISensorIotRepository
    {
        Task<IEnumerable<SensorIot>> GetAllAsync();
        Task<SensorIot> GetByIdAsync(int id);
        Task<SensorIot> AddAsync(SensorIot sensor);
        Task<SensorIot> UpdateAsync(SensorIot sensor);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<SensorIot>> BuscarPorNivelAguaAsync(decimal minimo, decimal maximo);
        Task<IEnumerable<SensorIot>> BuscarPorDataLeituraAsync(DateTime data);
    }
}