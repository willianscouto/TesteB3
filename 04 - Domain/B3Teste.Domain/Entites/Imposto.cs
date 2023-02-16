namespace B3Teste.Domain.Entites
{
    public class Imposto
    {
        public Imposto(double valorImposto,
                        int totalMesesResgate) { 

            ValorImposto = valorImposto;
            TotalMesesResgate = totalMesesResgate;
        }
        public double ValorImposto { get;private set; }
        public int TotalMesesResgate { get; private set; }
    }
}
