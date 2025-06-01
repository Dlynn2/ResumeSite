namespace ResumeSite.Server.DTO
{
    public class IpInfoDto
    {
        public string Ip { get; set; }
        public string Hostname { get; set; }
        public string Type { get; set; }
        public string Continent_Code { get; set; }
        public string Continent_Name { get; set; }
        public string Country_Code { get; set; }
        public string Country_Name { get; set; }
        public string Region_Code { get; set; }
        public string Region_Name { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Msa { get; set; }
        public string Dma { get; set; }
        public string Radius { get; set; }
        public string Ip_Routing_Type { get; set; }
        public string Connection_Type { get; set; }
        public LocationInfo Location { get; set; }
        public TimeZoneInfo Time_Zone { get; set; }
        public CurrencyInfo Currency { get; set; }
        public ConnectionInfo Connection { get; set; }
        public SecurityInfo Security { get; set; }
    }

    public class LocationInfo
    {
        public int Geoname_Id { get; set; }
        public string Capital { get; set; }
        public List<LanguageInfo> Languages { get; set; }
        public string Country_Flag { get; set; }
        public string Country_Flag_Emoji { get; set; }
        public string Country_Flag_Emoji_Unicode { get; set; }
        public string Calling_Code { get; set; }
        public bool Is_Eu { get; set; }
    }

    public class LanguageInfo
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Native { get; set; }
    }

    public class TimeZoneInfo
    {
        public string Id { get; set; }
        public string Current_Time { get; set; }
        public int Gmt_Offset { get; set; }
        public string Code { get; set; }
        public bool Is_Daylight_Saving { get; set; }
    }

    public class CurrencyInfo
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Plural { get; set; }
        public string Symbol { get; set; }
        public string Symbol_Native { get; set; }
    }

    public class ConnectionInfo
    {
        public int Asn { get; set; }
        public string Isp { get; set; }
        public string Sld { get; set; }
        public string Tld { get; set; }
        public string Carrier { get; set; }
        public string Home { get; set; }
        public string Organization_Type { get; set; }
        public string Isic_Code { get; set; }
        public string Naics_Code { get; set; }
    }

    public class SecurityInfo
    {
        public bool Is_Proxy { get; set; }
        public string Proxy_Type { get; set; }
        public bool Is_Crawler { get; set; }
        public string Crawler_Name { get; set; }
        public string Crawler_Type { get; set; }
        public bool Is_Tor { get; set; }
        public string Threat_Level { get; set; }
        public string Threat_Types { get; set; }
        public string Proxy_Last_Detected { get; set; }
        public string Proxy_Level { get; set; }
        public string Vpn_Service { get; set; }
        public string Anonymizer_Status { get; set; }
        public bool Hosting_Facility { get; set; }
    }
}