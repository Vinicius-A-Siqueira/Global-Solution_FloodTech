using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FloodTech.Domain.Entities;
using FloodTech.Domain.Interfaces;
using FloodTech.Infrastructure.Context;
using FloodTech.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FloodTech.Infrastructure.Repositories
{
    public class RotaSeguraRepository : IRotaSeguraRepository
    {
        private readonly FloodTechDbContext _context;

        public RotaSeguraRepository(FloodTechDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RotaSegura>> GetAllAsync()
        {
            return await _context.Rotas
                .Include(r => r.Origem)
                .Include(r => r.Destino)
                .ToListAsync();
        }

        public async Task<RotaSegura> GetByIdAsync(int id)
        {
            return await _context.Rotas
                .Include(r => r.Origem)
                .Include(r => r.Destino)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<RotaSegura> AddAsync(RotaSegura rota)
        {
            _context.Rotas.Add(rota);
            await _context.SaveChangesAsync();
            return rota;
        }

        public async Task<RotaSegura> UpdateAsync(RotaSegura rota)
        {
            _context.Rotas.Update(rota);
            await _context.SaveChangesAsync();
            return rota;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var rota = await _context.Rotas.FindAsync(id);
            if (rota == null) return false;

            _context.Rotas.Remove(rota);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<RotaSegura>> BuscarRotasEntrePontosAsync(int origemId, int destinoId)
        {
            return await _context.Rotas
                .Where(r => r.IdOrigemLocalizacao == origemId && r.IdDestinoLocalizacao == destinoId)
                .ToListAsync();
        }

        public async Task<IEnumerable<RotaSegura>> BuscarRotasPorDistanciaMaximaAsync(double distanciaMaximaKm)
        {
            // Supondo que você tenha um campo de distância em km
            return await _context.Rotas
                .Where(r => r.TempoEstimado <= distanciaMaximaKm)
                .ToListAsync();
        }
    }
}
