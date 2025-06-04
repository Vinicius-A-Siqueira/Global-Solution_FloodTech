using FloodTech.Application.Interfaces;
using FloodTech.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FloodTech.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AbrigoController : ControllerBase
    {
        private readonly IAbrigoService _abrigoService;

        public AbrigoController(IAbrigoService abrigoService)
        {
            _abrigoService = abrigoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Abrigo>>> GetAll()
        {
            var abrigos = await _abrigoService.ListarTodosAsync();
            return Ok(abrigos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Abrigo>> GetById(int id)
        {
            var abrigo = await _abrigoService.BuscarPorIdAsync(id);
            if (abrigo == null) return NotFound();
            return Ok(abrigo);
        }

        [HttpPost]
        public async Task<ActionResult<Abrigo>> Create(Abrigo abrigo)
        {
            var novoAbrigo = await _abrigoService.CriarAsync(abrigo);
            return CreatedAtAction(nameof(GetById), new { id = novoAbrigo.Id }, novoAbrigo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Abrigo>> Update(int id, Abrigo abrigo)
        {
            if (id != abrigo.Id) return BadRequest();

            var atualizado = await _abrigoService.AtualizarAsync(abrigo);
            if (atualizado == null) return NotFound();

            return Ok(atualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var removido = await _abrigoService.RemoverAsync(id);
            if (!removido) return NotFound();
            return NoContent();
        }
    }
}
