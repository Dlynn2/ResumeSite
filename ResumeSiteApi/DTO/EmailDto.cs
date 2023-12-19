namespace ResumeSiteApi.DTO
{
    internal class EmailDto
    {
        public class Content
        {
            public string Type { get; set; } = "text/plain";
            public string Value { get; set; } = string.Empty;
        }

        public class Personalization
        {
            public IEnumerable<string> To { get; set; } = new List<string>();
            public string Subject { get; set; } = string.Empty;
        }

        public class Email
        {
            //public IEnumerable<Personalization> Personalizations { get; set; } = new List<Personalization>();
            public string From { get; set; } = string.Empty;
            public IEnumerable<Content> content { get; set; } = new List<Content>();
        }
    }
}
