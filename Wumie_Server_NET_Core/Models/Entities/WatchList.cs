using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class WatchList
    {
        public int MovieID { get; set; }
        public string UserID { get; set; }

        // navigation props
        public Movie Movie { get; set; }
        public AppUser User { get; set; }
    }
}
