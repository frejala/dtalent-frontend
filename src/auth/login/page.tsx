import dTalentLogo from "@/assets/dTalentLogo.png";
import { Button } from "@/components/ui/button";
import {
  FloatingInput,
  FloatingLabel,
} from "@/components/ui/floating-label-input";
import authService from "@/services/auth";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const username = form["documentNumber"].value;
    const password = form["password"].value;

    authService
      .login({ username, password })
      .then((response) => {
        console.log("response: ", response);
        localStorage.setItem("token", response.token);
        navigate("/employees");
      })
      .catch(() => {
        alert("Error al iniciar sesión");
      });
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="md:flex md:min-h-screen md:items-center md:justify-center">
        <div
          className="
          w-full 
          h-screen 
          p-8 
          bg-gray-800 
          text-gray-100

          md:h-auto 
          md:max-w-md 
          md:rounded-md 
          md:shadow-md
        "
        >
          <div className="flex justify-center mb-8">
            <img src={dTalentLogo} alt="dTalent Logo" className="w-48 h-auto" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8 relative">
              <FloatingInput id="documentNumber" />
              <FloatingLabel htmlFor="documentNumber">
                Número de documento
              </FloatingLabel>
            </div>

            <div className="mb-6 relative">
              <FloatingInput id="password" type="password" />
              <FloatingLabel htmlFor="password">Contraseña</FloatingLabel>
            </div>

            <Button
              type="submit"
              className="w-full py-2 mb-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-400"
            >
              INICIAR SESIÓN
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="" className="text-sm text-blue-400 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
