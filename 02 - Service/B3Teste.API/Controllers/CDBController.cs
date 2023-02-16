using B3Teste.Application.Interfaces;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace B3Teste.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CDBController : ControllerBase
    {

        private readonly ICdbAppService _cdbAppService;
        private readonly IImpostoAppService _impostoAppService;

        public CDBController(ICdbAppService cdbAppService,
        IImpostoAppService impostoAppService)
        {

            _cdbAppService = cdbAppService;
            _impostoAppService = impostoAppService;
        }

        [HttpGet]
        [SwaggerOperation(Summary ="Get Cálculo CDB ", Description ="Consulta do Cálculo do CBD", OperationId ="Get")]
        public async Task<IActionResult> Get(int totalMeses, double valorInvestimento )
        {
            try
            {
                var imposto = await _impostoAppService.GetImposto(new Application.ViewModels.ImpostoViewModel() { TotalMesesResgate = totalMeses });

                var allResult = await _cdbAppService.GetCalculoRegate(new Application.ViewModels.CdbViewModel() { Imposto = imposto, ValorMonetario = valorInvestimento });
                return Ok(allResult);
     
            }
            catch (Exception ex)
            {

                var validationResult = new ValidationResult();
                if (!string.IsNullOrEmpty(ex.Message)) return BadRequest(ex.Message);
                else return StatusCode(500,"Erro Interno");
            }
        }
    }
}
