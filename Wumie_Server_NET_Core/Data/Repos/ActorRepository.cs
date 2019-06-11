using Wumie.Models.Entities;
using Wumie.Data.Abstract;

namespace Wumie.Data.Repositories
{
    public class ActorRepository : EntityBaseRepository<Actor>, IActorRepository
    {
        private ApplicationDbContext _context;

        public ActorRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;
        }
    }
}
