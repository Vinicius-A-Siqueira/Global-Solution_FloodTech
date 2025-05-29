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
public class PerfilService {
    private final PerfilRepository repository;
    private final UsuarioRepository usuarioRepo;
    private final ModelMapper modelMapper;

    public List<PerfilDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(p -> modelMapper.map(p, PerfilDTO.class))
                .collect(Collectors.toList());
    }

    public PerfilDTO buscarPorId(Long id) {
        Perfil perfil = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Perfil não encontrado"));
        return modelMapper.map(perfil, PerfilDTO.class);
    }

    public PerfilDTO salvar(PerfilDTO dto) {
        Perfil perfil = modelMapper.map(dto, Perfil.class);
        perfil.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        return modelMapper.map(repository.save(perfil), PerfilDTO.class);
    }

    public PerfilDTO atualizar(Long id, PerfilDTO dto) {
        Perfil existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Perfil não encontrado"));
        modelMapper.map(dto, existente);
        existente.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        return modelMapper.map(repository.save(existente), PerfilDTO.class);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}