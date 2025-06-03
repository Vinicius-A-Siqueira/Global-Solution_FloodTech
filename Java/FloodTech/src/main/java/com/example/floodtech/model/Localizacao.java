package com.example.floodtech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "TBL_LOCALIZACAO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Localizacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LOCALIZACAO")
    private Long id;

    @Column(name = "LATITUDE", nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(name = "LONGITUDE", nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @NotBlank
    @Column(name = "BAIRRO", length = 50, nullable = false)
    private String bairro;

    @NotBlank
    @Column(name = "CIDADE", length = 30, nullable = false)
    private String cidade;

    @NotBlank
    @Column(name = "ESTADO", length = 2, nullable = false)
    private String estado;

    @NotBlank
    @Column(name = "CEP", length = 10, nullable = false)
    private String cep;
}

