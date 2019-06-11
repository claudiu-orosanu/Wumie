using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class AwardMovie
    {
        public int ID { get; set; }
        public int MovieID { get; set; }
        public int AwardID { get; set; }

        // navigation props
        public Movie Movie { get; set; }
        public Award Award { get; set; }
    }
}
