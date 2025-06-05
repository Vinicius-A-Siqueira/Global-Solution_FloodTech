package com.example.floodtech.service;

import com.example.floodtech.dto.UsuarioDTO;
import com.example.floodtech.model.Usuario;
import com.example.floodtech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // Mapper: DTO -> Entidade
    private Usuario mapperDtoParaEntidade(UsuarioDTO dto) {
        return Usuario.builder()
                .id(dto.getId())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .tipoUsuario(dto.getTipoUsuario())
                .build();
    }

    // Mapper: Entidade -> DTO
    private UsuarioDTO mapperEntidadeParaDto(Usuario usuario) {
        return UsuarioDTO.builder()
                .id(usuario.getId())
                .email(usuario.getEmail())
                .senha(usuario.getSenha())
                .tipoUsuario(usuario.getTipoUsuario())
                .build();
    }

    public List<UsuarioDTO> listarTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(this::mapperEntidadeParaDto)
                .toList();
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return mapperEntidadeParaDto(usuario);
    }

    public UsuarioDTO salvar(UsuarioDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }
        Usuario usuario = mapperDtoParaEntidade(dto);
        usuario.setId(null); // para garantir insert e não update
        Usuario salvo = usuarioRepository.save(usuario);
        return mapperEntidadeParaDto(salvo);
    }

    public UsuarioDTO atualizar(Long id, UsuarioDTO dto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuarioExistente.setEmail(dto.getEmail());
        usuarioExistente.setSenha(dto.getSenha());
        usuarioExistente.setTipoUsuario(dto.getTipoUsuario());

        Usuario atualizado = usuarioRepository.save(usuarioExistente);
        return mapperEntidadeParaDto(atualizado);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }
}