using System;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Installer;

namespace GL.Core
{
    [AttributeUsage(AttributeTargets.Assembly)]
    public class IocAssemblyAttribute : Attribute { }

    public class Ioc
    {
        public IWindsorContainer Container { get; private set; }

        #region Current Singleton
        private Ioc() { }
        private static Ioc _Current;
        public static Ioc Current
        {
            get
            {
                _Current = _Current ?? LoadCurrent();
                return _Current;
            }
        }
        #endregion

        private static Ioc LoadCurrent()
        {
            var container = new WindsorContainer();


            var path = System.IO.Path.GetDirectoryName(
                System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase).Replace("file:\\", "");
            container.Install(
                FromAssembly.InDirectory(
                    new AssemblyFilter(path)
                    .FilterByAssembly(a => a.GetCustomAttributes(typeof(IocAssemblyAttribute), true).Length > 0)
                )
            );

            try
            {
                path = System.Configuration.ConfigurationManager.AppSettings.Get("SharedLibraries");
                if (path != null)
                {
                    container.Install(
                        FromAssembly.InDirectory(
                            new AssemblyFilter(path)
                            .FilterByAssembly(a => a.GetCustomAttributes(typeof(IocAssemblyAttribute), true).Length > 0)
                        )
                    );
                }
            }
            catch (Exception)
            {
            }

            return new Ioc { Container = container };
        }

        public static T Resolve<T>()
        {
            return Ioc.Current.Container.Resolve<T>();
        }

        public static T Resolve<T>(string name)
        {
            return Ioc.Current.Container.Resolve<T>(name);
        }

    }

}
