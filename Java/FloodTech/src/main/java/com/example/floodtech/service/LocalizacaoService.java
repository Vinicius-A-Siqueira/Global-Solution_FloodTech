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
public class LocalizacaoService {
    private final LocalizacaoRepository repository;
    private final ModelMapper modelMapper;

    public List<LocalizacaoDTO> listarTodos() {
        return repository.findAll().stream()
                .map(loc -> modelMapper.map(loc, LocalizacaoDTO.class))
                .collect(Collectors.toList());
    }

    public LocalizacaoDTO buscarPorId(Long id) {
        Localizacao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada"));
        return modelMapper.map(entity, LocalizacaoDTO.class);
    }

    public LocalizacaoDTO salvar(LocalizacaoDTO dto) {
        Localizacao entity = modelMapper.map(dto, Localizacao.class);
        return modelMapper.map(repository.save(entity), LocalizacaoDTO.class);
    }

    public LocalizacaoDTO atualizar(Long id, LocalizacaoDTO dto) {
        Localizacao existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada"));
        modelMapper.map(dto, existente);
        return modelMapper.map(repository.save(existente), LocalizacaoDTO.class);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
