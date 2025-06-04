using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;


namespace FloodTech.Domain.Interfaces
{
    public interface IAbrigoRepository
    {
        Task<IEnumerable<Abrigo>> GetAllAsync();
        Task<Abrigo> GetByIdAsync(int id);
        Task<Abrigo> AddAsync(Abrigo abrigo);
        Task<Abrigo> UpdateAsync(Abrigo abrigo);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<Abrigo>> BuscarAbrigadosPorCapacidadeMinimaAsync(int capacidadeMinima);
        Task<IEnumerable<Abrigo>> BuscarPorBairroAsync(string bairro);
    }
}
