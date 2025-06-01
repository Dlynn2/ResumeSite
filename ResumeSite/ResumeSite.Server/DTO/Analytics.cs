namespace ResumeSite.Server.DTO
{
    public class Analytics
    {
        public List<VisitorsPerRegion> VisitorsPerRegions { get; set; } = new List<VisitorsPerRegion>();
        public List<VisitorsPerBroswer> VisitorsPerBrowsers { get; set; } = new List<VisitorsPerBroswer>();
        public List<VisitorsPerOperatingSystem> VisitorsPerOperatingSystems { get; set; } = new List<VisitorsPerOperatingSystem>();
        public List<VisitorsPerDeviceType> VisitorsPerDeviceTypes { get; set; } = new List<VisitorsPerDeviceType>();
        public List<VisitorsPerCountry> VisitorsPerCountries { get; set; } = new List<VisitorsPerCountry>();
        public List<VisitorsPerCity> VisitorsPerCities { get; set; } = new List<VisitorsPerCity>();
        public List<VisitorsPerWeather> VisitorsPerWeathers { get; set; } = new List<VisitorsPerWeather>();
        public List<VisitorsPerMonth> VisitorsPerMonths { get; set; } = new List<VisitorsPerMonth>();
    }

    public class VisitorsPerRegion
    {
        public string RegionName { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerBroswer
    {
        public string Browser { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerOperatingSystem
    {
        public string OperatingSystem { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerDeviceType
    {
        public string DeviceType { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerCountry
    {
        public string Country { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerCity
    {
        public string City { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerWeather
    {
        public string WeatherCondition { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
    public class VisitorsPerMonth
    {
        public DateTime Month { get; set; } = DateTime.UtcNow;
        public int Count { get; set; } = 0;
    }
}

