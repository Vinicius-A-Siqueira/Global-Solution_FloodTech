package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "tbl_alerta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(length = 300, nullable = false)
    private String mensagem;

    @Column(name = "data_emissao", nullable = false)
    private java.time.LocalDate dataEmissao;

    @NotBlank
    @Column(name = "nivel_alerta", nullable = false)
    private String nivelAlerta;

    @ManyToOne
    @JoinColumn(name = "tbl_usuario_id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "tbl_localizacao_id_localizacao", nullable = false)
    private Localizacao localizacao;
}