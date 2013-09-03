using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GL.Base
{
    public class CommandAttribute : Attribute
    {
        public string Name { get; set; }

        public CommandAttribute(string Name)
        {
            this.Name = Name;
        }
    }
}
