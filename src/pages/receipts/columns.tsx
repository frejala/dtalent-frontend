import { ColumnDef } from "@tanstack/react-table";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: es,
  });
}

export const columns: ColumnDef<any>[] = [
  {
    header: "Tipo",
    accessorKey: "type",
  },
  {
    header: "Empleado",
    cell: ({ row }) => (
      <div className="flex flex-col items-center text-center">
        <span>{row.original.employeeFullName}</span>
        <span>#{row.original.employeeNumber}</span>
      </div>
    ),
  },
  {
    header: "Fecha",
    accessorKey: "fullDate",
  },
  {
    header: "Enviado",
    cell: ({ row }) => {
      const { isSended, sendedDate } = row.original;
      return isSended ? (
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="text-green-500" />
          <span className="text-sm">{timeAgo(sendedDate)}</span>
        </div>
      ) : (
        <CancelIcon className="text-red-500" />
      );
    },
  },
  {
    header: "Leído",
    cell: ({ row }) => {
      const { isReaded, readedDate } = row.original;
      return isReaded ? (
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="text-green-500" />
          <span className="text-sm">{timeAgo(readedDate)}</span>
        </div>
      ) : (
        <CancelIcon className="text-red-500" />
      );
    },
  },
  {
    header: "Firmado",
    cell: ({ row }) => {
      const { isSigned, signedDate } = row.original;
      return isSigned ? (
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="text-green-500" />
          <span className="text-sm">{timeAgo(signedDate)}</span>
        </div>
      ) : (
        <CancelIcon className="text-red-500" />
      );
    },
  },
];
