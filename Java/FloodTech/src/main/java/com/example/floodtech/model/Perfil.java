package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "TBL_PERFIL")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PERFIL")
    private Long id;

    @OneToOne
    @JoinColumn(name = "TBL_USUARIO_ID_USUARIO", nullable = false, unique = true)
    private Usuario usuario;

    @NotBlank
    @Column(name = "NOME_COMPLETO", length = 100, nullable = false)
    private String nomeCompleto;

    @NotBlank
    @Column(name = "ENDERECO", length = 200, nullable = false)
    private String endereco;

    @NotBlank
    @Column(name = "TELEFONE_PESSOAL", length = 20, nullable = false)
    private String telefonePessoal;

    @NotBlank
    @Column(name = "TELEFONE_EMERGENCIA", length = 20, nullable = false)
    private String telefoneEmergencia;
}
