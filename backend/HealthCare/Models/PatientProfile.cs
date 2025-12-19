using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthCare.Models;

public class PatientProfile
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    // FK → User
    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    // Patient-specific fields
    [MaxLength(10)]
    public string? PatientId { get; set; }   // hospital/patient identifier

    public double? HeightCm { get; set; }    // height in cm
    public double? WeightKg { get; set; }    // weight in kg

    [MaxLength(20)]
    public string? MaritalStatus { get; set; }

    [MaxLength(10)]
    public string? BloodGroup { get; set; }

    [MaxLength(10)]
    public string? Gender { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [MaxLength(500)]
    public string? Allergies { get; set; }

    [MaxLength(500)]
    public string? CurrentCondition { get; set; }

    // Audit
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
