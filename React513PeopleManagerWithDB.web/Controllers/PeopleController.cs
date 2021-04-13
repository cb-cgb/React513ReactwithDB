using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using React513PeopleManagerWithDB.data;

namespace React513PeopleManagerWithDB.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {

        private string _conn;

        public PeopleController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetPeople()
        {
            var db = new PeopleRepository(_conn);
            return db.GetPeople();
        }

        [HttpPost]
        [Route("add")]
        public void AddPerson (Person person)
        {
            var db = new PeopleRepository(_conn);
            db.AddPerson(person);
        }

        [HttpPost]
        [Route("delete")]
        public void DeletePerson (Person p)
        {
            var db = new PeopleRepository(_conn);
            db.DeletePerson(p.Id);
        }
    }
}
