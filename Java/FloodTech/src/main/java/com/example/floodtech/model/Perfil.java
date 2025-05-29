package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "tbl_perfil")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "tbl_usuario_id_usuario", nullable = false, unique = true)
    private Usuario usuario;

    @NotBlank
    private String nomeCompleto;

    @NotBlank
    private String endereco;

    @NotBlank
    private String telefonePessoal;

    @NotBlank
    private String telefoneEmergencia;
}