using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using Wumie.Models.Entities;
using Wumie.Models.Enums;
using Wumie.Data;

namespace Wumie.Data
{
    public class DbInitializer
    {
        private ApplicationDbContext _context;
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public DbInitializer(ApplicationDbContext context,
                             UserManager<AppUser> userManager,
                             RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task InitializeData()
      {
            _context.Database.EnsureCreated();

            

            // Look for any movies.
            if (_context.Movies.Any())
            {
                return;   // DB has been seeded
            }

            var movies = new Movie[]
            {
                new Movie {
                  Title = "Blade Runner 2049",
                  ReleaseDate = DateTime.Parse("2017-10-06"),
                  Runtime = 164,
                  Genre = Genre.ScienceFiction,
                  Language = Language.English,
                  Plot = "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
                  BoxOffice = 91800042
                },
                new Movie {
                  Title = "Dunkirk",
                  ReleaseDate = DateTime.Parse("2017-07-21"),
                  Runtime = 106,
                  Genre = Genre.Drama,
                  Language = Language.English,
                  Plot = "Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.",
                  BoxOffice = 188042171
                },
                new Movie {
                  Title = "Wonder",
                  ReleaseDate = DateTime.Parse("2017-11-17"),
                  Runtime = 113,
                  Genre = Genre.Drama,
                  Language = Language.English,
                  Plot = "Based on the New York Times bestseller, WONDER tells the incredibly inspiring and heartwarming story of August Pullman, a boy with facial differences who enters fifth grade, attending a mainstream elementary school for the first time.",
                  BoxOffice = 126638742
                },
                new Movie {
                  Title = "Drive",
                  ReleaseDate = DateTime.Parse("2011-07-16"),
                  Runtime = 100,
                  Genre = Genre.Action,
                  Language = Language.English,
                  Plot = "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in trouble when he helps out his neighbor.",
                  BoxOffice = 3506000
                },
                new Movie {
                  Title = "Geostorm",
                  ReleaseDate = DateTime.Parse("2017-09-20"),
                  Runtime = 109,
                  Genre = Genre.Drama,
                  Language = Language.English,
                  Plot = "When the network of satellites designed to control the global climate starts to attack Earth, it's a race against the clock for its creator to uncover the real threat before a worldwide Geostorm wipes out everything and everyone.",
                  BoxOffice = 33700000
                }
            };

            foreach (Movie movie in movies)
            {
                _context.Movies.Add(movie);
            }

            var actors = new Actor[]
            {
                new Actor { FirstName = "Ryan",   LastName = "Gosling",
                    BirthDate = DateTime.Parse("1980-11-12") },
                new Actor { FirstName = "Gerard",   LastName = "Butler",
                    BirthDate = DateTime.Parse("1969-11-13") },
                new Actor { FirstName = "Ed",   LastName = "Harris",
                    BirthDate = DateTime.Parse("1950-11-28") },
                new Actor { FirstName = "Fionn",   LastName = "Whitehead",
                    BirthDate = DateTime.Parse("1992-04-02") },
                new Actor { FirstName = "Owen",   LastName = "Wilson",
                    BirthDate = DateTime.Parse("1968-11-18") }
            };

            foreach (Actor actor in actors)
            {
                _context.Actors.Add(actor);
            }

            var actings = new Acting[]
            {
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Gosling").ID,
                    MovieID = movies.Single(c => c.Title == "Blade Runner 2049" ).ID,
                },
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Gosling").ID,
                    MovieID = movies.Single(c => c.Title == "Drive" ).ID,
                },
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Butler").ID,
                    MovieID = movies.Single(c => c.Title == "Geostorm" ).ID,
                },
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Harris").ID,
                    MovieID = movies.Single(c => c.Title == "Geostorm" ).ID,
                },
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Whitehead").ID,
                    MovieID = movies.Single(c => c.Title == "Dunkirk" ).ID,
                },
                new Acting {
                    ActorID = actors.Single(s => s.LastName == "Wilson").ID,
                    MovieID = movies.Single(c => c.Title == "Wonder" ).ID,
                }
            };

            foreach (Acting acting in actings)
            {
                _context.Actings.Add(acting);
            }



            #region Create two roles (admin, user) and two users.

            var findAdminRole = await _roleManager.FindByNameAsync("Admin");
            var findUserRole = await _roleManager.FindByNameAsync("User");
            var adminRole = new IdentityRole("Admin");
            var userRole = new IdentityRole("User");
    
            //If admin role does not exists, create it
            if (findAdminRole == null)
            {
                await _roleManager.CreateAsync(adminRole);
            }
            //If user role does not exists, create it
            if (findUserRole == null)
            {
                await _roleManager.CreateAsync(userRole);
            }

            var findAdminAccount = await _userManager.FindByNameAsync("admin@gmail.com");

            //If there is no user account "admin@adps.com", create it       
            if (findAdminAccount == null)
            {
                var admin = new AppUser()
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                    FirstName = "Admin",
                    LastName = "Global",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var result = await _userManager.CreateAsync(admin, "123456");
                var account = await _userManager.FindByEmailAsync(admin.Email);
                account.EmailConfirmed = true;

                try
                {
                    if (result.Succeeded)
                    {
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            var adminAccount = await _userManager.FindByNameAsync("admin@gmail.com");
            //If Admin account is not in an admin role, add it to the role.
            if (!await _userManager.IsInRoleAsync(adminAccount, adminRole.Name))
            {
                await _userManager.AddToRoleAsync(adminAccount, adminRole.Name);
            }

            var findUserAccount = await _userManager.FindByNameAsync("user@gmail.com");
            //If there is no user account "test@gmail.com, create it       
            if (findUserAccount == null)
            {
                var user = new AppUser()
                {
                    UserName = "claudiu.orosanu@gmail.com",
                    Email = "claudiu.orosanu@gmail.com",
                    FirstName = "Claudiu",
                    LastName = "Orosanu",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var result = await _userManager.CreateAsync(user, "123456");
                var account = await _userManager.FindByEmailAsync(user.Email);
                account.EmailConfirmed = true;

                try
                {
                    if (result.Succeeded)
                    {
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            var userAccount = await _userManager.FindByNameAsync("claudiu.orosanu@gmail.com");
            //If User account is not in an User role, add it to the role.
            if (!await _userManager.IsInRoleAsync(userAccount, userRole.Name))
            {
                await _userManager.AddToRoleAsync(userAccount, userRole.Name);
            }

            #endregion

            _context.SaveChanges();
        }
    }
}
