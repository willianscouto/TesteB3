namespace B3Teste.Domain.Entites
{
    public class Cdb
    {
   
        public Cdb(int mes,
                   double valorMonetario,
                   double valorBruto,
                   double valorLiquido,
                   Imposto imposto)
        {
            Mes = mes;
            ValorMonetario = valorMonetario;
            Imposto = imposto;
            ValorBruto = valorBruto;
            ValorLiquido = valorLiquido;
        }
        public int Mes { get; private set; }
        public double ValorMonetario { get; private set; }
        public Imposto Imposto { get; private set; }
        public double ValorBruto { get; private set; }
        public double ValorLiquido { get; private set; }
    }
}
