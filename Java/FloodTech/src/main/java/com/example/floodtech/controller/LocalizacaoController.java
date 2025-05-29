package com.example.floodtech.controller;

import com.example.floodtech.dto.LocalizacaoDTO;
import com.example.floodtech.model.Localizacao;
import com.example.floodtech.repository.LocalizacaoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/localizacoes")
@RequiredArgsConstructor
public class LocalizacaoController {
    private final LocalizacaoRepository repo;
    private final ModelMapper mapper;

    @GetMapping
    public List<LocalizacaoDTO> getAll() {
        return repo.findAll().stream().map(l -> mapper.map(l, LocalizacaoDTO.class)).toList();
    }

    @PostMapping
    public LocalizacaoDTO create(@RequestBody @Valid LocalizacaoDTO dto) {
        Localizacao loc = mapper.map(dto, Localizacao.class);
        return mapper.map(repo.save(loc), LocalizacaoDTO.class);
    }
}