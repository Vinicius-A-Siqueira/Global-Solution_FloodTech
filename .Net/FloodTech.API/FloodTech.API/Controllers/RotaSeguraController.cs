using FloodTech.Application.Interfaces;
using FloodTech.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FloodTech.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RotaSeguraController : ControllerBase
    {
        private readonly IRotaSeguraService _rotaSeguraService;

        public RotaSeguraController(IRotaSeguraService rotaSeguraService)
        {
            _rotaSeguraService = rotaSeguraService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RotaSegura>>> GetAll()
        {
            var rotas = await _rotaSeguraService.ListarTodasAsync();
            return Ok(rotas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RotaSegura>> GetById(int id)
        {
            var rota = await _rotaSeguraService.BuscarPorIdAsync(id);
            if (rota == null) return NotFound();
            return Ok(rota);
        }

        [HttpPost]
        public async Task<ActionResult<RotaSegura>> Create(RotaSegura rotaSegura)
        {
            var novaRota = await _rotaSeguraService.CriarAsync(rotaSegura);
            return CreatedAtAction(nameof(GetById), new { id = novaRota.Id }, novaRota);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RotaSegura>> Update(int id, RotaSegura rotaSegura)
        {
            if (id != rotaSegura.Id) return BadRequest();

            var atualizado = await _rotaSeguraService.AtualizarAsync(rotaSegura);
            if (atualizado == null) return NotFound();

            return Ok(atualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var removido = await _rotaSeguraService.RemoverAsync(id);
            if (!removido) return NotFound();
            return NoContent();
        }
    }
}
