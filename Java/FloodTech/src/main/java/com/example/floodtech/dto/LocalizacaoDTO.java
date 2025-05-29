package com.example.floodtech.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LocalizacaoDTO {
    private Long id;
    private Double latitude;
    private Double longitude;
    @NotBlank
    private String bairro;
    @NotBlank
    private String cidade;
    @NotBlank
    private String estado;
    @NotBlank
    private String cep;
}
