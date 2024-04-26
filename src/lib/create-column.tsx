export default function createColumn(
  field: any, 
  headerName: any, 
  renderCell?: any, 
  filterable?: boolean, 
  sortable?: boolean, 
  hideable?: boolean, 
  flex = 1
  ) 
{
  return {
    field,
    headerName,
    renderCell,
    filterable,
    flex,
    sortable,
    hideable
  }
}
