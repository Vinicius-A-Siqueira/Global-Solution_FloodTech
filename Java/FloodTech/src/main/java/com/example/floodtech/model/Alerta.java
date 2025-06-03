package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "TBL_ALERTA")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ALERTA")
    private Long id;

    @NotBlank
    @Column(name = "MENSAGEM", length = 300, nullable = false)
    private String mensagem;

    @Column(name = "DATA_EMISSAO", nullable = false)
    private java.time.LocalDate dataEmissao;

    @NotBlank
    @Column(name = "NIVEL_ALERTA", length = 20, nullable = false)
    private String nivelAlerta;

    @ManyToOne
    @JoinColumn(name = "TBL_USUARIO_ID_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "TBL_LOCALIZACAO_ID_LOCALIZACAO", nullable = false)
    private Localizacao localizacao;
}
