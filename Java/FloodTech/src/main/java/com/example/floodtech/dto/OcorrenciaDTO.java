package com.example.floodtech.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OcorrenciaDTO {
    private Long id;
    @NotBlank
    private String descricao;
    private LocalDateTime dataHora;
    @NotBlank
    private String status;
    private Long usuarioId;
    private Long localizacaoId;
}