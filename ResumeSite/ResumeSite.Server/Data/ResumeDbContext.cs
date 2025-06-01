using Microsoft.EntityFrameworkCore;
using ResumeSite.Server.Data.Models;
using ResumeSite.Server.DTO;

namespace ResumeSite.Server.Data
{
    public class ResumeDbContext : DbContext
    {
        public ResumeDbContext(DbContextOptions<ResumeDbContext> options)
            : base(options)
        {
        }

        // Example DbSet
        public DbSet<UserInfo> UserInformation { get; set; }
    }
}