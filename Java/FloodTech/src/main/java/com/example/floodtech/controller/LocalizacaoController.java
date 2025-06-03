package com.example.floodtech.controller;

import com.example.floodtech.dto.*;
import com.example.floodtech.service.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/localizacoes")
@RequiredArgsConstructor
@Tag(name = "Localizações")
@SecurityRequirement(name = "bearerAuth")
public class LocalizacaoController {
    private final LocalizacaoService service;

    @GetMapping
    public ResponseEntity<List<LocalizacaoDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocalizacaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<LocalizacaoDTO> salvar(@RequestBody LocalizacaoDTO dto) {
        return ResponseEntity.ok(service.salvar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocalizacaoDTO> atualizar(@PathVariable Long id, @RequestBody LocalizacaoDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}