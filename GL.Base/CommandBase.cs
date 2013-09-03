using System.Web.Script.Serialization;

namespace GL.Base
{
    public abstract class CommandBase<TRequest,TResponse>:ICommand
    {
        protected TRequest Request { get; set; }
        protected TResponse Response { get; set; }
        public string ExecuteJSON(string json)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            Request = ser.Deserialize<TRequest>(json);
            TResponse response = Execute(Request);
            return ser.Serialize(response);
        }

        protected abstract TResponse Execute(TRequest request);
    }
}
