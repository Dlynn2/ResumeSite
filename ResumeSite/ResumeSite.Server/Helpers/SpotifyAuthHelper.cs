namespace ResumeSite.Server.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Security.Cryptography;
    using System.Text;

    public static class SpotifyAuthHelper
    {
        public static string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var data = new byte[length];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(data);
            var result = new StringBuilder(length);
            foreach (var b in data)
            {
                result.Append(chars[b % chars.Length]);
            }
            return result.ToString();
        }

        public static string BuildSpotifyAuthQuery(string clientId, string redirectUri, string state)
        {
            var scope = "streaming user-read-email user-read-private";

            var queryParams = new Dictionary<string, string>
        {
            { "response_type", "code" },
            { "client_id", clientId },
            { "scope", scope },
            { "redirect_uri", redirectUri },
            { "state", state }
        };

            var query = new StringBuilder();
            foreach (var kvp in queryParams)
            {
                if (query.Length > 0)
                    query.Append('&');
                query.Append(Uri.EscapeDataString(kvp.Key));
                query.Append('=');
                query.Append(Uri.EscapeDataString(kvp.Value));
            }

            return query.ToString();
        }
    }
}
