using B3Teste.Application.AutoMapper;

namespace B3Teste.API.Configurations
{
    public static class AutoMapperConfig
    {
        public static void AddAutoMapperConfiguration(this IServiceCollection services) { 
        
        if(services ==null) throw new ArgumentNullException(nameof(services));
        services.AddAutoMapper(typeof(DomainToViewModelMappingProfile),typeof(ViewModelToDomainMappingProfile));
        }
    }
}
