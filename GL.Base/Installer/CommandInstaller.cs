using System.Linq;
using System.Reflection;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace GL.Base.Installer
{
    public class CommandInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            var path = System.IO.Path.GetDirectoryName(
            System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Replace("file:\\", "");

            container.Register(
                Classes.FromAssemblyInDirectory(new AssemblyFilter(path))
                    .BasedOn<ICommand>().WithService.FromInterface()
                    .ConfigureFor<ICommand>(c =>
                                                {
                                                    CommandAttribute attribute =
                                                        c.Implementation.GetCustomAttributes(typeof(CommandAttribute), true).First() as CommandAttribute;
                                                    var name = attribute != null
                                                                   ? attribute.Name
                                                                   : c.Implementation.Name;
                                                    c.Named(name);
                                                }).LifestyleTransient());
        }
    }
}


