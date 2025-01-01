import dTalentLogo from "@/assets/dTalentLogo.png";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function Sidenav() {
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
          href="#"
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
          href="#"
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
            DD
          </div>
          <div>
            <div className="text-sm">Bienvenido</div>
            <div className="text-sm font-semibold">dLab</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
