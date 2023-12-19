namespace ResumeSiteApi.DTO
{
    public class EmailRequest
    {
        public string EmailFrom { get; set; } = String.Empty;

        public string EmailSubject { get; set; } = String.Empty;

        public string EmailBody { get; set; } = String.Empty;
    }
}
