"use client"

import { Plus, Trash, Users } from "lucide-react"
import { PageTitle } from "../page-title"
import { Button } from "@/components/ui/button"

import { DataGrid } from '@mui/x-data-grid';

import { UsersColumns } from "../../_tables/users";

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 10 },
  { id: 6, lastName: 'Melisandre', firstName: 'X', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const UsersComponent = () => {
  return (
    <div>
      <PageTitle label='Users' icon={Users} />

      <div className="mt-4">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={UsersColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>

    </div>
  )
}