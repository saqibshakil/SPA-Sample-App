using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GL.Base;

namespace GL.Test
{
    [Command("GL.Security.SaqibTest")]
    public class SaqibTestCommand : CommandBase<DummyObject, int>
    {
        protected override int Execute(DummyObject request)
        {
            return request.fill;
        }

    }

    [Command("GL.Security.Bogus")]
    public class BogusCommand : CommandBase<int, string>
    {
        protected override string Execute(int request)
        {
            return request.ToString();
        }
    }
}
