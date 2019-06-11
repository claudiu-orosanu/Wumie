using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class Rating
    {
        public int ID { get; set; }
        public int Value { get; set; }
        public int MovieID { get; set; }

        // navigation props
        public AppUser User { get; set; }
        public Movie Movie { get; set; }
    }
}
