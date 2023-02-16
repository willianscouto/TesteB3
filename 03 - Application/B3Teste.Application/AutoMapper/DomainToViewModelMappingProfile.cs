using AutoMapper;
using B3Teste.Application.ViewModels;

namespace B3Teste.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile: Profile
    {
        public DomainToViewModelMappingProfile() {

            CreateMap<Domain.Entites.Cdb, CdbViewModel>();
            CreateMap<Domain.Entites.Imposto, ImpostoViewModel>();
        }
    }
}
