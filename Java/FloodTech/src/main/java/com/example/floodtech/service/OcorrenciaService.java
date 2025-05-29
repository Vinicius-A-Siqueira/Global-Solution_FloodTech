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
public class OcorrenciaService {
    private final OcorrenciaRepository repository;
    private final UsuarioRepository usuarioRepo;
    private final LocalizacaoRepository localizacaoRepo;
    private final ModelMapper modelMapper;

    public List<OcorrenciaDTO> listarTodos() {
        return repository.findAll().stream()
                .map(o -> modelMapper.map(o, OcorrenciaDTO.class))
                .collect(Collectors.toList());
    }

    public OcorrenciaDTO buscarPorId(Long id) {
        Ocorrencia entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ocorrência não encontrada"));
        return modelMapper.map(entity, OcorrenciaDTO.class);
    }

    public OcorrenciaDTO salvar(OcorrenciaDTO dto) {
        Ocorrencia entity = modelMapper.map(dto, Ocorrencia.class);
        entity.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        entity.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada")));
        return modelMapper.map(repository.save(entity), OcorrenciaDTO.class);
    }

    public OcorrenciaDTO atualizar(Long id, OcorrenciaDTO dto) {
        Ocorrencia existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ocorrência não encontrada"));
        modelMapper.map(dto, existente);
        existente.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        existente.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada")));
        return modelMapper.map(repository.save(existente), OcorrenciaDTO.class);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}