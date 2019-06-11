using Wumie.Models.Enums;
using Wumie.ViewModels.Validations;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;

namespace Wumie.ViewModels
{
    public class ActorViewModel
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public int MoviesCount { get; set; }

        public ActorViewModel()
        {
        }
    }
}
