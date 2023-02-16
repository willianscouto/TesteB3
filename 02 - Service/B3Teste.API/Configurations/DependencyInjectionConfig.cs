using B3Teste.Application.Interfaces;
using B3Teste.Application.Services;

namespace B3Teste.API.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static void AddDependencyInjectionConfiguration(this IServiceCollection services) {

            if (services == null) throw new ArgumentNullException(nameof(services));


            services.AddScoped<ICdbAppService, CdbAppService>();
            services.AddScoped<IImpostoAppService, ImpostoAppService>();

        }
    }
}
