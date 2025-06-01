using System.ComponentModel.DataAnnotations;

namespace ResumeSite.Server.Data.Models
{
    public class UserInfo
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string RegionName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string CityName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string CountryName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Weather { get; set; } = string.Empty;

        [MaxLength(45)]
        public string IpAddress { get; set; } = string.Empty;

        [MaxLength(255)]
        public string HostName { get; set; } = string.Empty;

        [MaxLength(512)]
        public string UserAgent { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Browser { get; set; } = string.Empty;

        [MaxLength(100)]
        public string OperatingSystem { get; set; } = string.Empty;

        [MaxLength(50)]
        public string DeviceType { get; set; } = string.Empty;

        public DateTime VistedAt { get; set; } = DateTime.UtcNow;
    }
}