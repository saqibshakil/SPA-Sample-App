using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService" in both code and config file together.
namespace GL.Web
{
    [ServiceContract]
    public interface IService
    {


        [OperationContract]
        [WebInvoke(
            Method = "POST",
            UriTemplate = "Command",
            BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        CommandResponse Command(CommandRequest request);

        [OperationContract]
        [WebInvoke(
            Method = "POST",
            UriTemplate = "Commands",
            BodyStyle = WebMessageBodyStyle.Bare,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        List<CommandResponse> Commands(CommandsRequest request);
    }

    [DataContract]
    public class CommandItem
    {
        [DataMember]
        public string UniqueIdentifier { get; set; }
        [DataMember]
        public string CommandName { get; set; }
        [DataMember]
        public string JSON { get; set; }
    }

    [DataContract]
    public class CommandRequest
    {
        [DataMember]
        public string AuthToken { get; set; }
        [DataMember]
        public CommandItem Command { get; set; }
    }

    [DataContract]
    public class CommandsRequest
    {
        [DataMember]
        public string AuthToken { get; set; }
        
        [DataMember]
        public List<CommandItem> Commands { get; set; }
    }

    [DataContract]
    public class CommandResponse
    {

        [DataMember]
        public string UniqueIdentifier { get; set; }
        [DataMember]
        public string CommandName { get; set; }
        [DataMember]
        public bool IsSuccess { get; set; }
        [DataMember]
        public string Message{ get; set;}
        [DataMember]
        public string JSON { get; set; }
        
    }

    [DataContract]
    public class LoginModelResponse
    {       
        [DataMember(Name="UserID")]
        public string UserID { get; set; }
        [DataMember(Name="UserName")]
        public string UserName { get; set; }

        [DataMember(Name = "IsLoggedIn")]
        public bool IsLoggedIn { get; set; }
        [DataMember(Name = "LoginToken")]
        public string LoginToken { get; set; }
    }

    [DataContract]
    public class LoginModelRequest
    {
        [DataMember(Name="username")]
        public string UserName { get; set; }
        [DataMember(Name="password")]
        public string Password { get; set; }
    }

    [DataContract]
    public class Person
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Address { get; set; }
    }
}