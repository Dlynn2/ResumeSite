namespace ResumeSite.Server.DTO
{
    namespace ResumeSite.Server.DTO
    {
        public class WeatherInfoDto
        {
            public WeatherRequestDto Request { get; set; }
            public WeatherLocationDto Location { get; set; }
            public WeatherCurrentDto Current { get; set; }
        }

        public class WeatherRequestDto
        {
            public string Type { get; set; }
            public string Query { get; set; }
            public string Language { get; set; }
            public string Unit { get; set; }
        }

        public class WeatherLocationDto
        {
            public string Name { get; set; }
            public string Country { get; set; }
            public string Region { get; set; }
            public string Lat { get; set; }
            public string Lon { get; set; }
            public string Timezone_Id { get; set; }
            public string Localtime { get; set; }
            public long Localtime_Epoch { get; set; }
            public string Utc_Offset { get; set; }
        }

        public class WeatherCurrentDto
        {
            public string Observation_Time { get; set; }
            public int Temperature { get; set; }
            public int Weather_Code { get; set; }
            public List<string> Weather_Icons { get; set; }
            public List<string> Weather_Descriptions { get; set; }
            public WeatherAstroDto Astro { get; set; }
            public WeatherAirQualityDto Air_Quality { get; set; }
            public int Wind_Speed { get; set; }
            public int Wind_Degree { get; set; }
            public string Wind_Dir { get; set; }
            public int Pressure { get; set; }
            public int Precip { get; set; }
            public int Humidity { get; set; }
            public int Cloudcover { get; set; }
            public int Feelslike { get; set; }
            public int Uv_Index { get; set; }
            public int Visibility { get; set; }
            public string Is_Day { get; set; }
        }

        public class WeatherAstroDto
        {
            public string Sunrise { get; set; }
            public string Sunset { get; set; }
            public string Moonrise { get; set; }
            public string Moonset { get; set; }
            public string Moon_Phase { get; set; }
            public int Moon_Illumination { get; set; }
        }

        public class WeatherAirQualityDto
        {
            public string Co { get; set; }
            public string No2 { get; set; }
            public string O3 { get; set; }
            public string So2 { get; set; }
            public string Pm2_5 { get; set; }
            public string Pm10 { get; set; }
            public string Us_Epa_Index { get; set; }
            public string Gb_Defra_Index { get; set; }
        }
    }
}
