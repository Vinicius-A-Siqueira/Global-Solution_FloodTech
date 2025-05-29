package com.example.floodtech.controller;

import com.example.floodtech.dto.OcorrenciaDTO;
import com.example.floodtech.model.Ocorrencia;
import com.example.floodtech.model.Usuario;
import com.example.floodtech.model.Localizacao;
import com.example.floodtech.repository.OcorrenciaRepository;
import com.example.floodtech.repository.UsuarioRepository;
import com.example.floodtech.repository.LocalizacaoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
@RequiredArgsConstructor
public class OcorrenciaController {
    private final OcorrenciaRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final LocalizacaoRepository localizacaoRepo;
    private final ModelMapper mapper;

    @GetMapping
    public List<OcorrenciaDTO> getAll() {
        return repo.findAll().stream().map(o -> {
            OcorrenciaDTO dto = mapper.map(o, OcorrenciaDTO.class);
            dto.setUsuarioId(o.getUsuario().getId());
            dto.setLocalizacaoId(o.getLocalizacao().getId());
            return dto;
        }).toList();
    }

    @PostMapping
    public OcorrenciaDTO create(@RequestBody @Valid OcorrenciaDTO dto) {
        Ocorrencia o = mapper.map(dto, Ocorrencia.class);
        o.setUsuario(usuarioRepo.findById(dto.getUsuarioId()).orElseThrow());
        o.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId()).orElseThrow());
        return mapper.map(repo.save(o), OcorrenciaDTO.class);
    }
}