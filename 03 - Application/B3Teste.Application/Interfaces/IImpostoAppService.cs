using B3Teste.Application.ViewModels;
using B3Teste.Domain.Entites;

namespace B3Teste.Application.Interfaces
{
    public interface IImpostoAppService
    {
        Task<ImpostoViewModel> GetImposto(ImpostoViewModel impostoViewModel);
        Task<double> GetValorLiquido(double valorInicial,double valorBruto,double valorImposto);
    }
}
