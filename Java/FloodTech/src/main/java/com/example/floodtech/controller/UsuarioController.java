package com.example.floodtech.controller;

import com.example.floodtech.dto.UsuarioDTO;
import com.example.floodtech.model.Usuario;
import com.example.floodtech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository repo;
    private final ModelMapper mapper;

    @GetMapping
    public List<UsuarioDTO> getAll() {
        return repo.findAll().stream()
                .map(user -> mapper.map(user, UsuarioDTO.class)).toList();
    }

    @PostMapping
    public UsuarioDTO create(@RequestBody @Valid UsuarioDTO dto) {
        Usuario saved = repo.save(mapper.map(dto, Usuario.class));
        return mapper.map(saved, UsuarioDTO.class);
    }
}