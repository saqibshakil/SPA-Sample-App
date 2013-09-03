// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service" in code, svc and config file together.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GL.Base;
using GL.Core;

namespace GL.Web
{
    public class Service : IService
    {

        public CommandResponse Command(CommandRequest commandRequest)
        {
            return ExecuteCommand(commandRequest.Command);
        }

        private CommandResponse ExecuteCommand(CommandItem Command)
        {
            try
            {
                var command = Ioc.Resolve<ICommand>(Command.CommandName);
                if (command == null)
                {
                    return new CommandResponse()
                               {
                                   IsSuccess = false,
                                   Message = "Command was not found",
                                   CommandName = Command.CommandName,
                                   UniqueIdentifier = Command.UniqueIdentifier

                               };
                }

                var response = command.ExecuteJSON(Command.JSON);

                return new CommandResponse()
                           {
                               IsSuccess = true,
                               JSON = response,
                               CommandName = Command.CommandName,
                               UniqueIdentifier = Command.UniqueIdentifier
                           };
            }
            catch (Exception ex)
            {
                return new CommandResponse()
                           {
                               IsSuccess = false,
                               Message = ex.Message,
                               CommandName = Command.CommandName,
                               UniqueIdentifier = Command.UniqueIdentifier
                           };
            }
        }

        public List<CommandResponse> Commands(CommandsRequest request)
        {
            var responses = new List<CommandResponse>();
            List<Task> tasks=new List<Task>();
            request.Commands.ForEach(
                command => tasks.Add( 
                    Task.Factory.StartNew(() => responses.Add(ExecuteCommand(command)))
                )
            );

            Task.WaitAll(tasks.ToArray());
            return responses;
        }
    }
}

