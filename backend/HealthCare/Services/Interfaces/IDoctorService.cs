using HealthCare.DTOs;

namespace HealthCare.Services.Interfaces;

public interface IDoctorService
{
    Task RegisterDoctorAsync(RegisterRequest req, IFormFile licenseFile, CancellationToken ct);
}
