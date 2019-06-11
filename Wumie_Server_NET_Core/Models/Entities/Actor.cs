using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wumie.Models.Entities
{
    public class Actor
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }

        // navigation properties
        public IList<Acting> Actings { get; set; }
    }
}
