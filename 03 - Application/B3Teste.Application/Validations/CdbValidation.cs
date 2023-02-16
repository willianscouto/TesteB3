using B3Teste.Domain.Entites;
using FluentValidation;

namespace B3Teste.Application.Validations
{
    public class CdbValidation : AbstractValidator<Cdb>
    {
        public CdbValidation()
        {

            #region Valor Monetario
            RuleFor(c => c.ValorMonetario).NotEmpty()
            .WithMessage("O valor monetário não pode ser nulo !!")
            .Must(ValidateValorMonetario)
            .WithMessage("O valor monetário não pode ser menor ou igual 0 !!");
            #endregion

       
        }

        private static bool ValidateValorMonetario(double valor)
        {

            return valor > 0;
        }

   
    }
}
