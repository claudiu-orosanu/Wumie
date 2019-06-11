using Wumie.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wumie.Data.Abstract
{
    public interface IMovieRepository : IEntityBaseRepository<Movie>
    {
    }

    public interface IActorRepository : IEntityBaseRepository<Actor>
    {
    }
}
