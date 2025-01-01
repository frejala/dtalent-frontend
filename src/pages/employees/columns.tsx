import { ColumnDef } from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";

export const columns: ColumnDef<any>[] = [
  {
    id: "initials",
    header: "",
    cell: ({ row }) => (
      <span className="bg-blue-500 text-white rounded-full size-8 flex items-center justify-center">
        {row.original.initials}
      </span>
    ),
  },
  {
    header: "Número",
    cell: ({ row }) => "#" + row.original.employeeNumber,
  },
  {
    accessorKey: "fullName",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "phoneNumber",
    header: "Teléfono",
  },
  {
    header: "Estado",
    cell: ({ row }) =>
      row.original.isActive ? (
        <span className="inline-block px-2 py-1 rounded-3xl bg-green-500 text-white">
          Activo
        </span>
      ) : (
        <span className="inline-block px-2 py-1 rounded-3xl bg-red-500">
          Inactivo
        </span>
      ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex space-y-2">
        <button className="text-blue-500">
          <EditIcon />
        </button>
      </div>
    ),
  },
];
