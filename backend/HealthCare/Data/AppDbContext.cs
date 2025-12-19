using Microsoft.EntityFrameworkCore;
using HealthCare.Models;

namespace HealthCare.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<DoctorProfile> DoctorProfiles => Set<DoctorProfile>();
    public DbSet<UserSession> UserSessions => Set<UserSession>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<PatientProfile>()
        .HasOne(p => p.User)
        .WithOne()
        .HasForeignKey<PatientProfile>(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DoctorProfile>()
        .HasOne(d => d.User)
        .WithOne()
        .HasForeignKey<DoctorProfile>(d => d.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    }

}
