using AutoMapper;
using B3Teste.Application.Interfaces;
using B3Teste.Application.Validations;
using B3Teste.Application.ViewModels;
using B3Teste.Domain.Entites;

namespace B3Teste.Application.Services
{
    public class CdbAppService : ICdbAppService
    {
        private readonly IMapper _mapper;
        private readonly IImpostoAppService _impostoAppService;
        public CdbAppService(IMapper mapper,
        IImpostoAppService impostoAppService)
        {
            _mapper = mapper;
            _impostoAppService = impostoAppService;
        }
        public async Task<IEnumerable<CdbViewModel>> GetCalculoRegate(CdbViewModel model)
        {
            var entity = _mapper.Map<Cdb>(model);
            var validationResult = new CdbValidation().Validate(entity);
            if (!validationResult.IsValid) throw new Exception(validationResult?.Errors?.FirstOrDefault()?.ErrorMessage);

            IList<Cdb> ret = new List<Cdb>();
            double valorMonet = model.ValorMonetario;

            for (int i = 1; i <= model?.Imposto?.TotalMesesResgate; i++)
            {

                var valorBruto = CalculoCdb(valorMonet);
                var valorLiquido  = await _impostoAppService.GetValorLiquido(valorMonet, valorBruto, model.Imposto);
                ret.Add(new Cdb(i, valorMonet, valorBruto, valorLiquido, entity.Imposto));

                valorMonet = valorLiquido;
            }

            return _mapper.Map<IEnumerable<CdbViewModel>>(ret);
        }

        private double CalculoCdb(double valorInicial)
        {
            //VF = VI x[1 +(CDI x TB)]
            double retorno = 0;
            double cdi = double.Parse("0,9") / 100;
            double tb = double.Parse("108") / 100;
            retorno = valorInicial * (1 + (cdi * tb));

            return Math.Truncate(retorno * 100) / 100; ;
        }
    }
}
