export interface AnalyticsModel {
    visitorsPerRegions: VisitorsPerRegion[];
    visitorsPerBrowsers: VisitorsPerBroswer[];
    visitorsPerOperatingSystems: VisitorsPerOperatingSystem[];
    visitorsPerDeviceTypes: VisitorsPerDeviceType[];
    visitorsPerCountries: VisitorsPerCountry[];
    visitorsPerCities: VisitorsPerCity[];
    visitorsPerWeathers: VisitorsPerWeather[];
    visitorsPerMonths: VisitorsPerMonth[];
}

export interface VisitorsPerRegion {
    regionName: string;
    count: number;
}

export interface VisitorsPerBroswer {
    browser: string;
    count: number;
}

export interface VisitorsPerOperatingSystem {
    operatingSystem: string;
    count: number;
}

export interface VisitorsPerDeviceType {
    deviceType: string;
    count: number;
}

export interface VisitorsPerCountry {
    country: string;
    count: number;
}

export interface VisitorsPerCity {
    city: string;
    count: number;
}

export interface VisitorsPerWeather {
    weatherCondition: string;
    count: number;
}

export interface VisitorsPerMonth {
    month: string;
    count: number;
}

export interface ChartDataItem {
  label: string;
  value: number;
}