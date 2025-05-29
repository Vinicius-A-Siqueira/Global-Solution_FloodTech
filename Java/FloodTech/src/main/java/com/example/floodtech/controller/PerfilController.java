package com.example.floodtech.controller;

import com.example.floodtech.dto.PerfilDTO;
import com.example.floodtech.model.Perfil;
import com.example.floodtech.model.Usuario;
import com.example.floodtech.repository.PerfilRepository;
import com.example.floodtech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/perfis")
@RequiredArgsConstructor
public class PerfilController {
    private final PerfilRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final ModelMapper mapper;

    @GetMapping
    public List<PerfilDTO> getAll() {
        return repo.findAll().stream().map(p -> {
            PerfilDTO dto = mapper.map(p, PerfilDTO.class);
            dto.setUsuarioId(p.getUsuario().getId());
            return dto;
        }).toList();
    }

    @PostMapping
    public PerfilDTO create(@RequestBody @Valid PerfilDTO dto) {
        Perfil perfil = mapper.map(dto, Perfil.class);
        Usuario user = usuarioRepo.findById(dto.getUsuarioId()).orElseThrow();
        perfil.setUsuario(user);
        return mapper.map(repo.save(perfil), PerfilDTO.class);
    }
}