using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wumie.Data;
using Wumie.Models.Entities;
using Wumie.ViewModels;
using Wumie.Data.Abstract;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace Wumie.Controllers
{
    [Produces("application/json")]
    [Route("api/movies")]
    [Authorize(Policy = "UserPolicy")]
    public class MoviesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMovieRepository _movieRepository;
        private readonly IActorRepository _actorRepository;

        public MoviesController(UserManager<AppUser> userManager, ApplicationDbContext context, IMovieRepository movieRepository, IActorRepository actorRepository)
        {
            _context = context;
            _movieRepository = movieRepository;
            _actorRepository = actorRepository;
            _userManager = userManager;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            List<Movie> movies = _movieRepository.GetAll().ToList();
            List<MovieViewModel> moviesVM = Mapper.Map<List<Movie>, List<MovieViewModel>>(movies);

            for (var i = 0; i < movies.Count(); i++)
            {
                var actingsCount = _context.Actings.Where(ac => ac.MovieID == movies[i].ID).Count();
                moviesVM[i].ActorsCount = actingsCount;
            }

            var userName = _userManager.GetUserId(User);
            var user = await _userManager.FindByNameAsync(userName);
            for (var i = 0; i < movies.Count(); i++)
            {
                var watchlist = _context.WatchLists.Where(wl => wl.MovieID == movies[i].ID && wl.UserID == user.Id).FirstOrDefault();
                if(watchlist != null)
                {
                    moviesVM[i].IsWatched = 1;
                }
            }

            return new OkObjectResult(moviesVM);
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Movie movie = _movieRepository.GetSingle(m => m.ID == id);

            if (movie != null)
            {
                MovieViewModel movieVM = Mapper.Map<Movie, MovieViewModel>(movie);

                return new OkObjectResult(movieVM);
            }
            else
                return NotFound();
        }

        // GET: api/movies
        [HttpGet("{id}/actors")]
        public async Task<IActionResult> GetActorsForMovie([FromRoute] int id)
        {
            Movie movie = _movieRepository.GetSingle(m => m.ID == id);
            if(movie == null)
            {
                return NotFound();
            }

            var actings = _context.Actings.Where(ac => ac.MovieID == id);
            var actors = actings.Select(ac => ac.Actor).ToList();
            
            IEnumerable<ActorViewModel> actorsVM = Mapper.Map<IEnumerable<Actor>, IEnumerable<ActorViewModel>>(actors);

            return new OkObjectResult(actorsVM);
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> PutMovie([FromRoute] int id, [FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.ID)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
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

        // POST: api/Movies
        [HttpPost]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> PostMovie([FromBody] MovieViewModel movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newMovie = Mapper.Map<MovieViewModel, Movie>(movie);

            await _movieRepository.AddAsync(newMovie);
            await _movieRepository.CommitAsync();

            movie = Mapper.Map<Movie, MovieViewModel>(newMovie);

            return CreatedAtAction("GetMovie", new { id = movie.ID }, movie);
        }

        public class ActorIdsWrapper
        {
            public int[] ActorIds { get; set; }
        }

        // POST: api/Movies
        [HttpPost("{id}/actors")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> AddActorsToMovie([FromRoute] int id, [FromBody] ActorIdsWrapper actorIdsWrapper)
        {

            Movie movie = _movieRepository.GetSingle(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            var count = 0;

            // add actors to movie
            foreach (var actorId in actorIdsWrapper.ActorIds)
            {
                Actor actor = _actorRepository.GetSingle(a => a.ID == actorId);
                if (actor == null)
                    continue;

                var acting = new Acting
                {
                    ActorID = actorId,
                    MovieID = id
                };

                var actingAlreadyExists = _context.Actings.Where(ac => ac.ActorID == actorId && ac.MovieID == id).FirstOrDefault();
                if (actingAlreadyExists != null)
                {
                    continue;
                }

                count++;
                _context.Actings.Add(acting);
                _context.SaveChanges();
            }

            return new OkObjectResult(count);
        }

        // POST: api/movies/5/watch
        [HttpPost("{id}/watch")]
        public async Task<IActionResult> AddMovieToWatchlist([FromRoute] int id)
        {

            Movie movie = _movieRepository.GetSingle(m => m.ID == id);
            if (movie == null)
            {
                return NotFound();
            }

            var userName = _userManager.GetUserId(User);
            var user = await _userManager.FindByNameAsync(userName);

            var movieAlreadyOnWatchlist = _context.WatchLists.Where(wl => wl.User.Id == user.Id && wl.MovieID == id).FirstOrDefault();
            if (movieAlreadyOnWatchlist != null)
            {
                return NotFound();
            }

            var watchList = new WatchList
            {
                MovieID = movie.ID,
                UserID = user.Id
            };

            _context.WatchLists.Add(watchList);
            _context.SaveChanges();

            return new OkObjectResult(0);
        }


        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteMovie([FromRoute] int id)
        {
            var deleteMovie = _movieRepository.GetSingle(m => m.ID == id);

            if (deleteMovie == null)
                return new NotFoundResult();
            else
            {
                _movieRepository.Delete(deleteMovie);

                await _movieRepository.CommitAsync();

                return new NoContentResult();
            }
        }


        // DELETE: api/movies/5/watch
        [HttpDelete("{id}/watch")]
        public async Task<IActionResult> RemoveMovieFromWatchlist([FromRoute] int id)
        {
            var movie = _movieRepository.GetSingle(m => m.ID == id);
            if (movie == null)
                return NotFound();

            var userName = _userManager.GetUserId(User);
            var user = await _userManager.FindByNameAsync(userName);

            var watchList = _context.WatchLists.Where(wl => wl.User.Id == user.Id && wl.MovieID == id).FirstOrDefault();
            if (watchList == null)
            {
                return NotFound();
            }

            _context.WatchLists.Remove(watchList);
            _context.SaveChanges();

            return new NoContentResult();

        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.ID == id);
        }
    }
}
