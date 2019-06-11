
using Wumie.Models.Entities;
using AutoMapper;
 

namespace Wumie.ViewModels.Mappings
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to ViewModel
            CreateMap<RegistrationViewModel, AppUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));

            CreateMap<Movie, MovieViewModel>();

            CreateMap<Actor, ActorViewModel>();
            CreateMap<Acting, ActingViewModel>();


            // ViewModel to Domain
            CreateMap<MovieViewModel, Movie>();
            CreateMap<ActorViewModel, Actor>();
            CreateMap<ActingViewModel, Acting>();
        }
    }
}
