package com.example.floodtech.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PerfilDTO {
    private Long id;
    private Long usuarioId;

    @NotBlank
    private String nomeCompleto;
    @NotBlank
    private String endereco;
    @NotBlank
    private String telefonePessoal;
    @NotBlank
    private String telefoneEmergencia;
}
