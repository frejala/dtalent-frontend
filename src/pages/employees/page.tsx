import { useEffect, useState, useCallback } from "react";
import employeesService from "@/services/employees";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { FilterItem } from "@/interfaces/filter";

const sortingList = [
  {
    key: "employeeNumber",
    label: "Número",
  },
  {
    key: "modifiedAt",
    label: "Más reciente",
  },
  {
    key: "createdAt",
    label: "Más antiguo",
  },
  {
    key: "firstName",
    label: "Nombre",
  },
  {
    key: "lastName",
    label: "Apellido",
  },
  {
    key: "email",
    label: "Correo Electrónico",
  },
];

const filterList = [
  {
    key: "remunerationType",
    label: "Tipo de remuneración",
    values: [
      {
        key: "hourly",
        label: "Por hora",
        isSelected: false,
      },
      {
        key: "Jornalero",
        label: "Jornalero",
        isSelected: false,
      },
    ],
  },
  {
    key: "position",
    label: "Puesto",
    values: [
      {
        key: "manager",
        label: "Manager",
        isSelected: false,
      },
      {
        key: "developer",
        label: "Developer",
        isSelected: false,
      },
      {
        key: "designer",
        label: "Designer",
        isSelected: false,
      },
    ],
  },
  {
    key: "section",
    label: "Sección",
    values: [
      {
        key: "dev",
        label: "Desarrollo",
        isSelected: false,
      },
      {
        key: "marketing",
        label: "Marketing",
        isSelected: false,
      },
      {
        key: "it",
        label: "IT",
        isSelected: false,
      },
    ],
  },
  {
    key: "workshift",
    label: "Turno",
    values: [
      {
        key: "8-16",
        label: "Mañana",
        isSelected: false,
      },
      {
        key: "afternoon",
        label: "Tarde",
        isSelected: false,
      },
      {
        key: "night",
        label: "Noche",
        isSelected: false,
      },
    ],
  },
  {
    key: "isActive",
    label: "Estado",
    values: [
      {
        key: "true",
        label: "Activo",
        isSelected: false,
      },
      {
        key: "false",
        label: "Inactivo",
        isSelected: false,
      },
    ],
  },
  {
    key: "nationality",
    label: "Nacionalidad",
    values: [
      {
        key: "Paraguaya",
        label: "Paraguaya",
        isSelected: false,
      },
      {
        key: "Aleman",
        label: "Aleman",
        isSelected: false,
      },
      {
        key: "Canadiense",
        label: "Canadiense",
        isSelected: false,
      },
    ],
  },
  {
    key: "role",
    label: "Rol",
    values: [
      {
        key: "Funcionario",
        label: "Funcionario",
        isSelected: false,
      },
      {
        key: "Supervisor",
        label: "Supervisor",
        isSelected: false,
      },
    ],
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<{
    key: string | null;
    value: string | null;
  }>({ key: null, value: null });
  const [filters, setFilters] = useState<FilterItem[]>([]);

  const fetchEmployees = useCallback(() => {
    const params: Record<string, string> = {};

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (sort?.key) {
      params.sort = sort.key;
    }

    filters.forEach((filter) => {
      const selected = filter.values.find((v) => v.isSelected);
      if (selected) {
        params[filter.key] = selected.key;
      }
    });

    employeesService.getEmployees(params).then((response) => {
      setEmployees(response.results);
    });
  }, [searchQuery, sort, filters]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="flex justify-between items-center space-x-2 mb-4">
        <div className="flex space-x-2">
          <h2 className="text-3xl font-semibold text-gray-800">
            Lista de empleados
          </h2>
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1">
            2
          </span>
        </div>
        <div className="flex justify-end space-x-2 items-end">
          <button className="bg-white text-gray-400 font-semibold px-4 py-2 rounded-md border-gray-500">
            IMPORTAR
          </button>
          <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md">
            + NUEVO EMPLEADO
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={employees}
        sortingList={sortingList}
        filterList={filterList}
        searchQuery={searchQuery}
        sort={sort}
        filters={filters}
        setSort={setSort}
        setFilters={setFilters}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
