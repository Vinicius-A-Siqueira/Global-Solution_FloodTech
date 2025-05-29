package com.example.floodtech.repository;

import com.example.floodtech.model.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {
    List<Ocorrencia> findByUsuarioId(Long usuarioId);
    List<Ocorrencia> findByLocalizacaoId(Long localizacaoId);
    List<Ocorrencia> findByStatus(String status);
}
