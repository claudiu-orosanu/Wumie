using Wumie.Data;
using Wumie.Models.Entities;
using Wumie.Data.Abstract;
using Wumie.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Wumie.Data.Repositories
{
    public class MovieRepository : EntityBaseRepository<Movie>, IMovieRepository
    {
        private ApplicationDbContext _context;

        public MovieRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
