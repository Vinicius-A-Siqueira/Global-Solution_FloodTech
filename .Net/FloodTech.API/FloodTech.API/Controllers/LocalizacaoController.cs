using FloodTech.Application.Interfaces;
using FloodTech.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FloodTech.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalizacaoController : ControllerBase
    {
        private readonly ILocalizacaoService _localizacaoService;

        public LocalizacaoController(ILocalizacaoService localizacaoService)
        {
            _localizacaoService = localizacaoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Localizacao>>> GetAll()
        {
            var locais = await _localizacaoService.ListarTodosAsync();
            return Ok(locais);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Localizacao>> GetById(int id)
        {
            var local = await _localizacaoService.BuscarPorIdAsync(id);
            if (local == null) return NotFound();
            return Ok(local);
        }

        [HttpPost]
        public async Task<ActionResult<Localizacao>> Create(Localizacao localizacao)
        {
            var novoLocal = await _localizacaoService.CriarAsync(localizacao);
            return CreatedAtAction(nameof(GetById), new { id = novoLocal.Id }, novoLocal);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Localizacao>> Update(int id, Localizacao localizacao)
        {
            if (id != localizacao.Id) return BadRequest();

            var atualizado = await _localizacaoService.AtualizarAsync(localizacao);
            if (atualizado == null) return NotFound();

            return Ok(atualizado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var removido = await _localizacaoService.RemoverAsync(id);
            if (!removido) return NotFound();
            return NoContent();
        }
    }
}
