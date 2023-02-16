namespace B3Teste.Application.ViewModels
{
    public class CdbViewModel
    {
        public int Mes { get;  set; }
        public double ValorMonetario { get;  set; }
        public ImpostoViewModel? Imposto { get;  set; }
        public double ValorBruto { get;  set; }
        public double ValorLiquido { get;  set; }
    }
}
