using HealthCare.Models;

namespace HealthCare.Repositories.Interfaces;

public interface IDoctorRepository
{
    Task AddAsync(DoctorProfile profile, CancellationToken ct);
    Task SaveAsync(CancellationToken ct);
}
