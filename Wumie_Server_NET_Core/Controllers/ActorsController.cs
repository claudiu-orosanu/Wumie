using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wumie.Data;
using Wumie.Models.Entities;
using Wumie.ViewModels;
using Wumie.Data.Abstract;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Wumie.Controllers
{
    [Produces("application/json")]
    [Route("api/actors")]
    [Authorize(Policy = "UserPolicy")]
    public class ActorsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IActorRepository _actorRepository;

        public ActorsController(ApplicationDbContext context, IActorRepository actorRepository)
        {
            _context = context;
            _actorRepository = actorRepository;
        }

        // GET: api/actors
        [HttpGet]
        public IEnumerable<ActorViewModel> GetActors()
        {
      
            List<Actor> actors = _actorRepository.GetAll().ToList();
            List<ActorViewModel> actorsVM = Mapper.Map<List<Actor>, List<ActorViewModel>>(actors);

            for(var i = 0; i<actors.Count(); i++)
            {
                var actingsCount = _context.Actings.Where(ac => ac.ActorID == actors[i].ID).Count();
                actorsVM[i].MoviesCount = actingsCount;
            }

            return actorsVM;
        }

        // GET: api/actors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Actor actor = _actorRepository.GetSingle(m => m.ID == id);

            if (actor != null)
            {
                ActorViewModel actorVM = Mapper.Map<Actor, ActorViewModel>(actor);
                return new OkObjectResult(actorVM);
            }
            else
                return NotFound();
        }

        // GET: api/actors/5/movies
        [HttpGet("{id}/movies")]
        public async Task<IActionResult> GetMoviesForActor([FromRoute] int id)
        {
            Actor actor = _actorRepository.GetSingle(m => m.ID == id);
            if(actor == null)
            {
                return NotFound();
            }

            var actings = _context.Actings.Where(ac => ac.ActorID == id);
            var movies = actings.Select(ac => ac.Movie).ToList();

            IEnumerable<MovieViewModel> moviesVM = Mapper.Map<IEnumerable<Movie>, IEnumerable<MovieViewModel>>(movies);

            return new OkObjectResult(moviesVM);
        }

        // PUT: api/actors/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> PutActor([FromRoute] int id, [FromBody] Actor actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != actor.ID)
            {
                return BadRequest();
            }

            _context.Entry(actor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/actors
        [HttpPost]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> PostActor([FromBody] ActorViewModel actor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newActor = Mapper.Map<ActorViewModel, Actor>(actor);

            await _actorRepository.AddAsync(newActor);
            await _actorRepository.CommitAsync();

            actor = Mapper.Map<Actor, ActorViewModel>(newActor);

            return CreatedAtAction("GetActor", new { id = actor.ID }, actor);
        }

        // DELETE: api/actors/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteActor([FromRoute] int id)
        {
            var deleteActor = _actorRepository.GetSingle(m => m.ID == id);

            if (deleteActor == null)
                return new NotFoundResult();
            else
            {
                _actorRepository.Delete(deleteActor);

                await _actorRepository.CommitAsync();

                return new NoContentResult();
            }
        }

        private bool ActorExists(int id)
        {
            return _context.Actors.Any(e => e.ID == id);
        }
    }
}
