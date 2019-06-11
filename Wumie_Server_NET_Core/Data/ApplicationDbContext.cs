
using Wumie.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Wumie.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Acting> Actings { get; set; }
        public DbSet<Award> Awards { get; set; }
        public DbSet<AwardMovie> AwardMovies { get; set; }
        public DbSet<WatchList> WatchLists { get; set; }
        public DbSet<Rating> Ratings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Movie>().ToTable("Movie");
            modelBuilder.Entity<Customer>().ToTable("Customer");

            modelBuilder.Entity<Acting>().HasKey(a => new { a.ActorID, a.MovieID });
            modelBuilder.Entity<WatchList>().HasKey(a => new { a.UserID, a.MovieID });
        }
    }
}
