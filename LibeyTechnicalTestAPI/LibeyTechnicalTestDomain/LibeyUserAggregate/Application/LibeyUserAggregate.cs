using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.DTO;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Application.Interfaces;
using LibeyTechnicalTestDomain.LibeyUserAggregate.Domain;
using System.Net;
using System.Numerics;
using System;
namespace LibeyTechnicalTestDomain.LibeyUserAggregate.Application
{
    public class LibeyUserAggregate : ILibeyUserAggregate
    {
        private readonly ILibeyUserRepository _repository;
        public LibeyUserAggregate(ILibeyUserRepository repository)
        {
            _repository = repository;
        }

        public List<LibeyUser> List()
        {
            return _repository.List();
        }
        public void Create(UserUpdateorCreateCommand command)
        {
            LibeyUser row =  new LibeyUser(
                command.DocumentNumber,
                command.DocumentTypeId, 
                command.Name, 
                command.FathersLastName, 
                command.MothersLastName, 
                command.Address,
                command.UbigeoCode, 
                command.Phone, 
                command.Email,
                command.Password
                );

            _repository.Create(row);
        }
        public LibeyUserResponse FindResponse(string documentNumber)
        {
            var row = _repository.FindResponse(documentNumber);
            return row;
        }
        public void Update(UserUpdateorCreateCommand command)
        {
            LibeyUser row = new LibeyUser(
                command.DocumentNumber,
                command.DocumentTypeId,
                command.Name,
                command.FathersLastName,
                command.MothersLastName,
                command.Address,
                command.UbigeoCode,
                command.Phone,
                command.Email,
                command.Password
                );
            _repository.Update(row);
        }
        public int Find(string documentNumber)
        {
            return _repository.Find(documentNumber);
        }
        public void Delete(LibeyUserResponse command)
        {
            LibeyUser row = new LibeyUser(
                command.DocumentNumber,
                command.DocumentTypeId,
                command.Name,
                command.FathersLastName,
                command.MothersLastName,
                command.Address,
                command.UbigeoCode,
                command.Phone,
                command.Email,
                command.Password
                );
            _repository.Delete(row);
        }
    }
}