import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
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
    header: "Activo",
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
];
