package com.example.floodtech.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String senha;

    private String tipoUsuario;
}