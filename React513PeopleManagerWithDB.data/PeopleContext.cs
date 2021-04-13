using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace React513PeopleManagerWithDB.data
{
    public class PeopleContext : DbContext
    {
        private readonly string _connectionString;

        public PeopleContext(string conn)
        {
            _connectionString = conn;
        }

        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }

    }
}
