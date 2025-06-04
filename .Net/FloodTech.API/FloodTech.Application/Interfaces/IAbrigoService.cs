using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Entities;

namespace FloodTech.Application.Interfaces
{
    public interface IAbrigoService
    {
        Task<IEnumerable<Abrigo>> ListarTodosAsync();
        Task<Abrigo> BuscarPorIdAsync(int id);
        Task<Abrigo> CriarAsync(Abrigo abrigo);
        Task<Abrigo> AtualizarAsync(Abrigo abrigo);
        Task<bool> RemoverAsync(int id);
        Task<IEnumerable<Abrigo>> BuscarPorCapacidadeAsync(int capacidadeMinima);
    }
}
