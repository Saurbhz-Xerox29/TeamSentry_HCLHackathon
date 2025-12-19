using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthCare.Models;

public class DoctorProfile
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    // FK → User
    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    // Approval flow
    public bool IsApproved { get; set; } = false;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? ApprovedAtUtc { get; set; }

    // License upload
    [MaxLength(255)]
    public string? LicenseFileName { get; set; }

    [MaxLength(500)]
    public string? LicenseFilePath { get; set; }

    public DateTime? LicenseUploadedAtUtc { get; set; }
}
