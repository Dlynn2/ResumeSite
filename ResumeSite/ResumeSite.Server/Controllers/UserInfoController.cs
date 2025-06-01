using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ResumeSite.Server.Data;
using ResumeSite.Server.DTO;
namespace ResumeSite.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : Controller
    {
        private readonly IMemoryCache _cache;
        private readonly ResumeDbContext _dbContext;

        public UserInfoController(IMemoryCache cache, ResumeDbContext dbContext)
        {
            _cache = cache;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<Analytics>> Get()
        {
            string cacheKey = $"analytics";
            if (_cache.TryGetValue(cacheKey, out Analytics cachedAnalytics))
            {
                return cachedAnalytics;
            }
            try
            {
                var userinfo = await _dbContext.UserInformation.ToListAsync();

                var analytics = new Analytics
                {
                    VisitorsPerRegions = userinfo
                        .GroupBy(u => u.RegionName)
                        .Select(g => new VisitorsPerRegion
                        {
                            RegionName = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerBrowsers = userinfo
                        .GroupBy(u => u.Browser)
                        .Select(g => new VisitorsPerBroswer
                        {
                            Browser = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerOperatingSystems = userinfo
                        .GroupBy(u => u.OperatingSystem)
                        .Select(g => new VisitorsPerOperatingSystem
                        {
                            OperatingSystem = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerDeviceTypes = userinfo
                        .GroupBy(u => u.DeviceType)
                        .Select(g => new VisitorsPerDeviceType
                        {
                            DeviceType = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerCountries = userinfo
                        .GroupBy(u => u.CountryName)
                        .Select(g => new VisitorsPerCountry
                        {
                            Country = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerCities = userinfo
                        .GroupBy(u => u.CityName)
                        .Select(g => new VisitorsPerCity
                        {
                            City = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerWeathers = userinfo
                        .GroupBy(u => u.Weather)
                        .Select(g => new VisitorsPerWeather
                        {
                            WeatherCondition = g.Key,
                            Count = g.Count()
                        }).ToList(),

                    VisitorsPerMonths = userinfo
                        .GroupBy(u => new DateTime(u.VistedAt.Year, u.VistedAt.Month, 1))
                        .Select(g => new VisitorsPerMonth
                        {
                            Month = g.Key,
                            Count = g.Count()
                        }).ToList()
                };

                _cache.Set(cacheKey, analytics);

                return analytics;
            }
            catch (Exception ex)
            {
                return StatusCode(503, "Database is waking up or unavailable. Please try again in a moment.");
            }
        }
    }
}
