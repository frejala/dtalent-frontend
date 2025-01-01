import dTalentLogo from "@/assets/dTalentLogo.png";
import { useUserContext } from "@/context/useUser";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidenav() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside
      className="
        flex 
        h-screen 
        w-64 
        flex-col 
        bg-black
        text-white
      "
    >
      <div className="flex items-center justify-center p-4 border-b border-gray-800">
        <img src={dTalentLogo} alt="dTalent Logo" className="w-36 h-auto" />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <a
          href="employees"
          className="
            flex 
            items-center 
            gap-3 
            px-3 
            py-2 
            rounded 
            hover:bg-gray-800
          "
        >
          <GroupIcon />
          <span>Empleados</span>
        </a>

        <a
          href="receipts"
          className="
            flex 
            items-center 
            gap-3 
            px-3 
            py-2 
            rounded 
            hover:bg-gray-800
          "
        >
          <ReceiptIcon />
          <span>Recibos</span>
        </a>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex 
              h-10 
              w-10 
              items-center 
              justify-center 
              rounded-full 
              bg-blue-600 
              text-white 
              text-sm 
              font-bold
            "
          >
            {user?.initials}
          </div>
          <div>
            <div className="text-sm">Bienvenido</div>
            <div className="text-sm font-semibold">{user?.firstName}</div>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem onSelect={handleLogout}>
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </aside>
  );
}
