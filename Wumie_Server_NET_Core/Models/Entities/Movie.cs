using System;
using System.Collections.Generic;
using Wumie.Models.Enums;

namespace Wumie.Models.Entities
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Runtime { get; set; }
        public Genre Genre { get; set; }
        public Language Language { get; set; }
        public string Plot { get; set; }
        public double BoxOffice { get; set; }

        // navigation properties
        public IList<Acting> Actings { get; set; }
        public ICollection<AwardMovie> AwardMovies { get; set; }
        public ICollection<WatchList> WatchLists { get; set; }
        public ICollection<Rating> Ratings { get; set; }

    }
}
