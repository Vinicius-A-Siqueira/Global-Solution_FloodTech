package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "TBL_OCORRENCIA")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_OCORRENCIA")
    private Long id;

    @NotBlank
    @Column(name = "DESCRICAO", length = 400, nullable = false)
    private String descricao;

    @Column(name = "DATA_HORA", nullable = false)
    private java.time.LocalDateTime dataHora;

    @NotBlank
    @Column(name = "STATUS", length = 20, nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "TBL_USUARIO_ID_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "TBL_LOCALIZACAO_ID_LOCALIZACAO", nullable = false)
    private Localizacao localizacao;
}

