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
public class AlertaService {
    private final AlertaRepository repository;
    private final UsuarioRepository usuarioRepo;
    private final LocalizacaoRepository localizacaoRepo;
    private final ModelMapper modelMapper;

    public List<AlertaDTO> listarTodos() {
        return repository.findAll().stream()
                .map(a -> modelMapper.map(a, AlertaDTO.class))
                .collect(Collectors.toList());
    }

    public AlertaDTO buscarPorId(Long id) {
        Alerta alerta = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Alerta não encontrado"));
        return modelMapper.map(alerta, AlertaDTO.class);
    }

    public AlertaDTO salvar(AlertaDTO dto) {
        Alerta alerta = modelMapper.map(dto, Alerta.class);
        alerta.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        alerta.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada")));
        return modelMapper.map(repository.save(alerta), AlertaDTO.class);
    }

    public AlertaDTO atualizar(Long id, AlertaDTO dto) {
        Alerta existente = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Alerta não encontrado"));
        modelMapper.map(dto, existente);
        existente.setUsuario(usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
        existente.setLocalizacao(localizacaoRepo.findById(dto.getLocalizacaoId())
                .orElseThrow(() -> new EntityNotFoundException("Localização não encontrada")));
        return modelMapper.map(repository.save(existente), AlertaDTO.class);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
