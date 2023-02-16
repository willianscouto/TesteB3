using B3Teste.Domain.Entites;
using FluentValidation;

namespace B3Teste.Application.Validations
{
    public class ImpostoValidation : AbstractValidator<Imposto>
    {
        public ImpostoValidation()
        {

            #region Total Meses resgate
            RuleFor(c => c.TotalMesesResgate).NotEmpty()
            .WithMessage("O total de meses para resgate não pode ser nulo !!")
            .Must(ValidateTotalMesesResgate)
            .WithMessage("O total de meses para resgate não pode ser menor ou igual 0 !!");
            #endregion
        }

        private static bool ValidateTotalMesesResgate(int totalMeses)
        {

            return totalMeses > 0;
        }
    }
}
