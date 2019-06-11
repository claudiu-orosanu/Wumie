
using FluentValidation;
 

namespace Wumie.ViewModels.Validations
{
    public class MovieViewModelValidator : AbstractValidator<MovieViewModel>
    {
        public MovieViewModelValidator()
        {
            RuleFor(vm => vm.Title).NotEmpty().WithMessage("Title cannot be empty");
            RuleFor(vm => vm.Runtime).NotEmpty().WithMessage("Runtime cannot be empty");
            RuleFor(vm => vm.Title).Length(2, 255).WithMessage("Title must be between 6 and 12 characters");
            RuleFor(vm => vm.Plot).Length(2, 255).WithMessage("Plot must be between 6 and 12 characters");
        }
    }
}
