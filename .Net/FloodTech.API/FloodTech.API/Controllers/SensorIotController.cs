using FloodTech.Application.Interfaces;
using FloodTech.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FloodTech.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorIotController : ControllerBase
    {
        private readonly ISensorIotService _sensorIotService;

        public SensorIotController(ISensorIotService sensorIotService)
        {
            _sensorIotService = sensorIotService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SensorIot>>> GetAll()
        {
            var sensores = await _sensorIotService.ListarTodosAsync();
            return Ok(sensores);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SensorIot>> GetById(int id)
        {
            var sensor = await _sensorIotService.BuscarPorIdAsync(id);
            if (sensor == null) return NotFound();
            return Ok(sensor);
        }

        [HttpPost]
        public async Task<ActionResult<SensorIot>> Create(SensorIot sensorIot)
        {
            var novoSensor = await _sensorIotService.CriarAsync(sensorIot);
            return CreatedAtAction(nameof(GetById), new { id = novoSensor.Id }, novoSensor);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SensorIot>> Update(int id, SensorIot sensorIot)
        {
            if (id != sensorIot.Id) return BadRequest();

            var atualizado = await _sensorIotService.AtualizarAsync(sensorIot);
            if (atualizado == null) return NotFound();

            return Ok(atualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var removido = await _sensorIotService.RemoverAsync(id);
            if (!removido) return NotFound();
            return NoContent();
        }
    }
}
