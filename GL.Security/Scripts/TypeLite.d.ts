
 


module GL.Test {
interface DummyObject {
  kill: string;
  fill: number;
}
}
module GL.Security {
interface LoginResponse {
  UserID: string;
  UserName: string;
  IsLoggedIn: bool;
  LoginToken: string;
  AvailableModules: GL.Security.Modules[];
}
interface Modules {
  ModName: string;
  IsDefault: bool;
}
interface LoginRequest {
  username: string;
  password: string;
}
}
