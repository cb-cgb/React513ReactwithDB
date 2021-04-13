using System;
using System.Collections.Generic;
using System.Linq;

namespace React513PeopleManagerWithDB.data
{
    public class PeopleRepository
    {
        private string _conn;

        public PeopleRepository(string conn)
        {
            _conn = conn;
        }

        public List<Person> GetPeople()
        {
            using (var context = new PeopleContext(_conn))
            {
                return context.People.ToList();
            }

        }
        public void AddPerson(Person p)
        {
            using (var context = new PeopleContext(_conn))
            {
                context.Add(p);
                context.SaveChanges();
            }
        }

        public void UpdatePerson(Person p)
        {
            using (var context = new PeopleContext(_conn))
            {
                context.Update(p);
                context.SaveChanges();
            }
        }

        public void DeletePerson(int id)
        {
            using (var context = new PeopleContext(_conn))
            {
                context.Remove(context.People.FirstOrDefault(p=> p.Id ==id));
                context.SaveChanges();
            }
        }

    }
            

    }
