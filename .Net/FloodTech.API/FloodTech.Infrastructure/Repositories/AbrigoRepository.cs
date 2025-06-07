using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;
using FloodTech.Domain.Interfaces;
using FloodTech.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FloodTech.Infrastructure.Repositories
{
    public class AbrigoRepository : IAbrigoRepository
    {
        private readonly FloodTechDbContext _context;

        public AbrigoRepository(FloodTechDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Abrigo>> GetAllAsync()
        {
            return await _context.Abrigos.Include(a => a.Localizacao).ToListAsync();
        }

        public async Task<Abrigo> GetByIdAsync(int id)
        {
            var abrigo = await _context.Abrigos
                .Include(a => a.Localizacao)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (abrigo == null)
                throw new KeyNotFoundException($"Abrigo com ID {id} não encontrado.");

            return abrigo;
        }

        public async Task<Abrigo> AddAsync(Abrigo abrigo)
        {
            _context.Abrigos.Add(abrigo);
            await _context.SaveChangesAsync();
            return abrigo;
        }

        public async Task<Abrigo> UpdateAsync(Abrigo abrigo)
        {
            _context.Abrigos.Update(abrigo);
            await _context.SaveChangesAsync();
            return abrigo;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var abrigo = await _context.Abrigos.FindAsync(id);
            if (abrigo == null) return false;

            _context.Abrigos.Remove(abrigo);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Abrigo>> BuscarAbrigadosPorCapacidadeMinimaAsync(int capacidadeMinima)
        {
            return await _context.Abrigos
                .Where(a => a.Capacidade >= capacidadeMinima)
                .ToListAsync();
        }

        public async Task<IEnumerable<Abrigo>> BuscarPorBairroAsync(string bairro)
        {
            return await _context.Abrigos
                .Include(a => a.Localizacao)
                .Where(a => a.Localizacao.Bairro.ToLower() == bairro.ToLower())
                .ToListAsync();
        }
    }
}
