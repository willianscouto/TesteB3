using B3Teste.APITests;
using B3Teste.Application.Interfaces;
using B3Teste.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace B3Teste.API.Controllers.Tests
{
    [TestClass]
    public class CDBControllerTests
    {
        [TestMethod()]
        public void GetTest()
        {
            ////
            int totalMesesResgate = 12;
            double valorMonetario = double.Parse("1000");
            ImpostoViewModel impostoViewModel = new ImpostoViewModel() { TotalMesesResgate = totalMesesResgate };
            CdbViewModel cdbViewModel = new CdbViewModel() { Imposto = impostoViewModel, ValorMonetario = valorMonetario };
            Mock<ICdbAppService> _cdbAppService = new Mock<ICdbAppService>();
            Mock<IImpostoAppService> _impostoAppService = new Mock<IImpostoAppService>();
            /// Arrange

            _impostoAppService.Setup(x => x.GetImposto(impostoViewModel)).ReturnsAsync(ImpostoMockData.GetImpostoMeses());
            _cdbAppService.Setup(x => x.GetCalculoRegate(cdbViewModel)).ReturnsAsync(CdbMockData.GetCalculoCdb());
            var controller = new CdbController(_cdbAppService.Object, _impostoAppService.Object);

            /// Act
            var result = controller.Get(totalMesesResgate, valorMonetario);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            
        }
    }
}