package com.example.floodtech.controller;

import com.example.floodtech.dto.AlertaDTO;
import com.example.floodtech.model.Alerta;
import com.example.floodtech.model.Usuario;
import com.example.floodtech.model.Localizacao;
import com.example.floodtech.repository.AlertaRepository;
import com.example.floodtech.repository.UsuarioRepository;
import com.example.floodtech.repository.LocalizacaoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/alertas")
@RequiredArgsConstructor
public class AlertaController {
    private final AlertaRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final LocalizacaoRepository localizacaoRepo;
    private final ModelMapper mapper;

    @GetMapping
    public List<AlertaDTO> getAll() {
        return repo.findAll().stream().map(a -> {
            AlertaDTO dto = mapper.map(a, AlertaDTO.class);
            dto.setUsuarioId(a.getUsuario().getId());
            dto.setLocalizacaoId(a.getLocalizacao().getId());
            return dto;
        }).toList();
    }

    @PostMapping
    public AlertaDTO create(@RequestBody @Valid AlertaDTO dto) {
        Alerta alerta = mapper.map(dto, Alerta.class);
        alerta.setUsuario(usuarioRepo.findById(dto.getUsuarioId()).orElseThrow());
        alerta.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId()).orElseThrow());
        return mapper.map(repo.save(alerta), AlertaDTO.class);
    }
}