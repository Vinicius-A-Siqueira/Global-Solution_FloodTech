using FloodTech.Domain.Entities;
using FloodTech.Domain.Interfaces;
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
            return await _context.Sensores
                .Include(s => s.Localizacao)
                .Include(s => s.Leituras)
                .ToListAsync();
        }

        public async Task<SensorIot?> GetByIdAsync(int id)
        {
            return await _context.Sensores
                .Include(s => s.Localizacao)
                .Include(s => s.Leituras)
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
            return await _context.Sensores
                .Include(s => s.Leituras)
                .Where(s => s.TipoSensor == "NIVEL" &&
                       s.Leituras.Any(l => l.Valor >= minimo && l.Valor <= maximo))
                .ToListAsync();
        }

        public async Task<IEnumerable<SensorIot>> BuscarPorDataLeituraAsync(DateTime data)
        {
            return await _context.Sensores
                .Include(s => s.Leituras)
                .Where(s => s.Leituras.Any(l => l.DataHora.Date == data.Date))
                .ToListAsync();
        }
    }
}
