using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.DTO;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
namespace LibeyTechnicalTestAPI.Controllers.LibeyUser
{
    [ApiController]
    [Route("[controller]")]
    public class LibeyUserController : Controller
    {
        private readonly ILibeyUserAggregate _aggregate;
        public LibeyUserController(ILibeyUserAggregate aggregate)
        {
            _aggregate = aggregate;
        }
        [HttpGet]
        [Route("all")]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_aggregate.List());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "Ocurrio un error en el proceso", debug = ex.Message });
            }
        }
        [HttpGet]
        [Route("{documentNumber}")]
        public IActionResult FindResponse(string documentNumber)
        {
            try
            {
                var row = _aggregate.FindResponse(documentNumber);
                return Ok(row);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "Ocurrio un error en el proceso", debug = ex.Message });
            }
        }
        [HttpPost]       
        public IActionResult Create(UserUpdateorCreateCommand command)
        {
            try
            {
                _aggregate.Create(command);
                return Ok(true);
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "Ocurrio un error en el proceso", debug = ex.Message });
            }
        }
        [HttpPut]
        public IActionResult Update(UserUpdateorCreateCommand command)
        {
            try
            {
                int find = _aggregate.Find(command.DocumentNumber);
                if(find == 1)
                {
                    _aggregate.Update(command);
                    return Ok(true);
                }
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "No se encontró el usuario."});
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "Ocurrio un error en el proceso", debug = ex.Message });
            }
        }
        [HttpDelete]
        [Route("{documentNumber}")]
        public IActionResult Delete(string documentNumber)
        {
            try
            {
                int find = _aggregate.Find(documentNumber);
                if (find == 1)
                {
                    _aggregate.Delete(_aggregate.FindResponse(documentNumber));
                    return Ok(true);
                }
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "No se encontró el usuario." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, new { message = "Ocurrio un error en el proceso", debug = ex.Message });
            }
        }
    }
}