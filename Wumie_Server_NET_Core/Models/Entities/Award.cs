using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class Award
    {
        public int ID { get; set; }
        public string Name { get; set; }

        // navigation props
        public ICollection<AwardMovie> AwardMovies { get; set; }
    }
}
