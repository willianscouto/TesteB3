using AutoMapper;
using B3Teste.Application.Interfaces;
using B3Teste.Application.Validations;
using B3Teste.Application.ViewModels;
using B3Teste.Domain.Entites;

namespace B3Teste.Application.Services
{
    public class ImpostoAppService: IImpostoAppService
    {
        private readonly IMapper _mapper;   
        public ImpostoAppService(IMapper mapper) { 
        
            _mapper = mapper;
        }
        private static double GetImposto06Meses
        {
            get { return Double.Parse("22,5"); }
        }

        private static  double GetImposto12Meses
        {
            get { return Double.Parse("20"); }
        }

        private static double GetImposto24Meses
        {
            get { return Double.Parse("17,5"); }
        }
        private static double GetImpostoMaior24Meses
        {
            get { return Double.Parse("15"); }
        }

        private static double GetPercentualImposto(int totalMesesResgate)
        {
            if (totalMesesResgate < 7) return GetImposto06Meses;
            else if(totalMesesResgate >6 && totalMesesResgate <13) return GetImposto12Meses;
            else if (totalMesesResgate > 12 && totalMesesResgate < 25) return GetImposto12Meses;
            else return GetImposto24Meses;
         
        }

        public async Task<ImpostoViewModel> GetImposto(ImpostoViewModel impostoViewModel)
        {
            await Task.Yield();
            var entity =_mapper.Map<Imposto>(impostoViewModel);
            var validationResult = new ImpostoValidation().Validate(entity);
            if (!validationResult.IsValid) throw new ArgumentNullException(validationResult?.Errors?.FirstOrDefault()?.ErrorMessage);

            entity = new Imposto(GetPercentualImposto(entity.TotalMesesResgate), entity.TotalMesesResgate);
            return _mapper.Map<ImpostoViewModel>(entity);
        }

        public  async Task<double> GetValorLiquido(double valorInicial,double valorBruto, double valorImposto)
        {
            await Task.Yield();
            double percentual = valorImposto / 100;
            var valorLucroBruto = valorBruto - valorInicial;
            var valorLucroLiquido = valorLucroBruto - (percentual * valorLucroBruto);
            var retorno = valorInicial + valorLucroLiquido;
            return Math.Truncate(retorno * 100) / 100; 
        }

    }
}
