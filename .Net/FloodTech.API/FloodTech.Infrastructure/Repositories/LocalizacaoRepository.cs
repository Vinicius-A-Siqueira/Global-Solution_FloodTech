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
    public class LocalizacaoRepository : ILocalizacaoRepository
    {
        private readonly FloodTechDbContext _context;

        public LocalizacaoRepository(FloodTechDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Localizacao>> GetAllAsync()
        {
            return await _context.Localizacoes.ToListAsync();
        }

        public async Task<Localizacao> GetByIdAsync(int id)
        {
            return await _context.Localizacoes.FindAsync(id);
        }

        public async Task<Localizacao> AddAsync(Localizacao localizacao)
        {
            _context.Localizacoes.Add(localizacao);
            await _context.SaveChangesAsync();
            return localizacao;
        }

        public async Task<Localizacao> UpdateAsync(Localizacao localizacao)
        {
            _context.Localizacoes.Update(localizacao);
            await _context.SaveChangesAsync();
            return localizacao;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Localizacoes.FindAsync(id);
            if (entity == null) return false;

            _context.Localizacoes.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Localizacao>> BuscarPorCidadeAsync(string cidade)
        {
            return await _context.Localizacoes
                .Where(l => l.Cidade.ToLower() == cidade.ToLower())
                .ToListAsync();
        }
    }
}
