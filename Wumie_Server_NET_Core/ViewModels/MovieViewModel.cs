
using Wumie.Models.Enums;
using Wumie.ViewModels.Validations;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;

namespace Wumie.ViewModels
{
    [Validator(typeof(MovieViewModelValidator))]
    public class MovieViewModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Runtime { get; set; }
        public Genre Genre { get; set; }
        public Language Language { get; set; }
        public string Plot { get; set; }
        public double BoxOffice { get; set; }
        public int ActorsCount { get; set; }
        public int IsWatched { get; set; }

    }
}
