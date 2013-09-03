using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using GL.Base;
using TypeLite;

namespace GL.Security
{
    [Command("GL.Security.Login")]
    public class LoginCommand:CommandBase<LoginRequest,LoginResponse>
    {
        protected override LoginResponse Execute(LoginRequest request)
        {
            return new LoginResponse()
                       {
                           IsLoggedIn = true,
                           LoginToken = Guid.NewGuid().ToString(),
                           UserID = request.username,
                           UserName = "Saqib Shakil",
                           AvailableModules = new List<Modules>()
                                                  {
                                                      new Modules() {ModName = "GMC"},
                                                      new Modules() {ModName = "Connect", IsDefault = true}
                                                  }

                       };
        }
    }

    [TsClass]
    public class LoginResponse
    {
        public string UserID { get; set; }
        public string UserName { get; set; }

        public bool IsLoggedIn { get; set; }
        public string LoginToken { get; set; }
        public List<Modules> AvailableModules { get; set; }
    }

    [TsClass]
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
