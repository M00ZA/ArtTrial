import { DataGrid } from '@mui/x-data-grid';

export const DataTable = ({ rows, columns }: { rows: any, columns: any }) => {
  return (
    <div className="mt-4">
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={ row => row._id }
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  )
}