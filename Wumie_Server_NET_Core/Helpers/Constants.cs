
namespace Wumie.Helpers
{
    public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "rol", Id = "id", Fnm="fnm", Lnm="lnm";
            }

            public static class JwtClaims
            {
                public const string UserRole = "User";
                public const string AdminRole = "Admin";
            }
        }
    }
}
