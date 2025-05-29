package com.example.floodtech.service;

import com.example.floodtech.dto.*;
import com.example.floodtech.model.*;
import com.example.floodtech.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repository;
    private final ModelMapper modelMapper;

    public List<UsuarioDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                .collect(Collectors.toList());
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        return modelMapper.map(usuario, UsuarioDTO.class);
    }

    public UsuarioDTO salvar(UsuarioDTO dto) {
        Usuario entity = modelMapper.map(dto, Usuario.class);
        return modelMapper.map(repository.save(entity), UsuarioDTO.class);
    }

    public UsuarioDTO atualizar(Long id, UsuarioDTO dto) {
        Usuario existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        modelMapper.map(dto, existente);
        return modelMapper.map(repository.save(existente), UsuarioDTO.class);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
