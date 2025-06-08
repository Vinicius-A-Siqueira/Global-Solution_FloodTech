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
            CreateMap<Localizacao, LocalizacaoDto>().ReverseMap();

            CreateMap<Abrigo, AbrigoDto>().ReverseMap();

            CreateMap<SensorIot, SensorIotDto>().ReverseMap();

            CreateMap<RotaSegura, RotaSeguraDto>().ReverseMap();
        }
    }
}
