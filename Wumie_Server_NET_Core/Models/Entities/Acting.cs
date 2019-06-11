using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class Acting
    {
        public int MovieID { get; set; }
        public int ActorID { get; set; }

        // navigation props
        public Movie Movie { get; set; }
        public Actor Actor { get; set; }

    }
}
