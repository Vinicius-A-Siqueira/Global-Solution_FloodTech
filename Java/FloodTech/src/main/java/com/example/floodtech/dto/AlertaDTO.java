package com.example.floodtech.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AlertaDTO {
    private Long id;
    @NotBlank
    private String mensagem;
    private LocalDate dataEmissao;
    @NotBlank
    private String nivelAlerta;
    private Long usuarioId;
    private Long localizacaoId;
}
