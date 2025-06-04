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
    public class SensorIotRepository : ISensorIotRepository
    {
        private readonly FloodTechDbContext _context;

        public SensorIotRepository(FloodTechDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SensorIot>> GetAllAsync()
        {
            return await _context.Sensores.Include(s => s.Localizacao).ToListAsync();
        }

        public async Task<SensorIot> GetByIdAsync(int id)
        {
            return await _context.Sensores.Include(s => s.Localizacao)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<SensorIot> AddAsync(SensorIot sensor)
        {
            _context.Sensores.Add(sensor);
            await _context.SaveChangesAsync();
            return sensor;
        }

        public async Task<SensorIot> UpdateAsync(SensorIot sensor)
        {
            _context.Sensores.Update(sensor);
            await _context.SaveChangesAsync();
            return sensor;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sensor = await _context.Sensores.FindAsync(id);
            if (sensor == null) return false;

            _context.Sensores.Remove(sensor);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<SensorIot>> BuscarPorNivelAguaAsync(decimal minimo, decimal maximo)
        {
            // Supondo que o nível de água seja um campo do sensor ou relacionado
            return await _context.Sensores
                .Where(s => s.TipoSensor == "NIVEL" && s.Valor >= minimo && s.Valor <= maximo)
                .ToListAsync();
        }

        public async Task<IEnumerable<SensorIot>> BuscarPorDataLeituraAsync(DateTime data)
        {
            // Supondo que haja uma tabela de leituras associada
            return await _context.Sensores
                .Where(s => s.DataUltimaLeitura.Date == data.Date)
                .ToListAsync();
        }
    }
}
