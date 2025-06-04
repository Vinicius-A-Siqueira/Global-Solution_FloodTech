using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FloodTech.Application.DTOs;
using FloodTech.Domain.Entities;

namespace FloodTech.Application.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Localização
            CreateMap<Localizacao, LocalizacaoDto>().ReverseMap();

            // Abrigo
            CreateMap<Abrigo, AbrigoDto>().ReverseMap();

            // Sensor IoT
            CreateMap<SensorIot, SensorIotDto>().ReverseMap();

            // Rota Segura
            CreateMap<RotaSegura, RotaSeguraDto>().ReverseMap();
        }
    }
}
