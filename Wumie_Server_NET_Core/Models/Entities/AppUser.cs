
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Wumie.Models.Entities
{
    // Add profile data for application users by adding properties to this class
    public class AppUser : IdentityUser
    {
        // Extended Properties
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }

        // navigation properties
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<WatchList> WatchLists { get; set; }
    }
}
