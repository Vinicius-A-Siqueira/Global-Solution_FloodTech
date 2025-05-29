package com.example.floodtech.repository;

import com.example.floodtech.model.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    List<Alerta> findByUsuarioId(Long usuarioId);
    List<Alerta> findByLocalizacaoId(Long localizacaoId);
    List<Alerta> findByNivelAlerta(String nivelAlerta);
}
