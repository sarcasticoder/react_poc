"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Edit, Trash2, Plus } from "lucide-react"

import { Button } from "@/commons/ui/button"
import { Checkbox } from "@/commons/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/commons/ui/dropdown-menu"
import { Input } from "@/commons/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/commons/ui/table"
import EditUserDialog, { User } from "./EditUserDialog"

// Sample user data with 25 rows
const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Viewer",
    status: "Inactive",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-02-20",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    role: "Editor",
    status: "Inactive",
    createdAt: "2024-02-25",
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona.green@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-03-01",
  },
  {
    id: "9",
    name: "George Lucas",
    email: "george.lucas@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-03-05",
  },
  {
    id: "10",
    name: "Hannah Montana",
    email: "hannah.montana@example.com",
    role: "Viewer",
    status: "Inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "11",
    name: "Ian Fleming",
    email: "ian.fleming@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-03-15",
  },
  {
    id: "12",
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-03-20",
  },
  {
    id: "13",
    name: "Kevin Costner",
    email: "kevin.costner@example.com",
    role: "Viewer",
    status: "Inactive",
    createdAt: "2024-03-25",
  },
  {
    id: "14",
    name: "Lisa Simpson",
    email: "lisa.simpson@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-04-01",
  },
  {
    id: "15",
    name: "Michael Jordan",
    email: "michael.jordan@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-04-05",
  },
  {
    id: "16",
    name: "Nancy Drew",
    email: "nancy.drew@example.com",
    role: "Admin",
    status: "Inactive",
    createdAt: "2024-04-10",
  },
  {
    id: "17",
    name: "Oliver Twist",
    email: "oliver.twist@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-04-15",
  },
  {
    id: "18",
    name: "Penelope Cruz",
    email: "penelope.cruz@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-04-20",
  },
  {
    id: "19",
    name: "Quentin Tarantino",
    email: "quentin.tarantino@example.com",
    role: "Editor",
    status: "Inactive",
    createdAt: "2024-04-25",
  },
  {
    id: "20",
    name: "Rachel Green",
    email: "rachel.green@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-05-01",
  },
  {
    id: "21",
    name: "Steve Jobs",
    email: "steve.jobs@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-05-05",
  },
  {
    id: "22",
    name: "Tina Turner",
    email: "tina.turner@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-05-10",
  },
  {
    id: "23",
    name: "Ulysses Grant",
    email: "ulysses.grant@example.com",
    role: "Viewer",
    status: "Inactive",
    createdAt: "2024-05-15",
  },
  {
    id: "24",
    name: "Victoria Beckham",
    email: "victoria.beckham@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-05-20",
  },
  {
    id: "25",
    name: "William Shakespeare",
    email: "william.shakespeare@example.com",
    role: "Viewer",
    status: "Active",
    createdAt: "2024-05-25",
  },
]


export default function UsersDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [editingUser, setEditingUser] = React.useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    if (editingUser) {
      // Edit mode - update existing user
      console.log("Updating user:", updatedUser)
      // TODO: Implement actual update logic
    } else {
      // Add mode - create new user
      console.log("Adding new user:", updatedUser)
      // TODO: Implement actual add logic
    }
    // For now, just close the dialog
    setIsEditDialogOpen(false)
    setEditingUser(null)
  }

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false)
    setEditingUser(null)
  }

  const handleAddUser = () => {
    setEditingUser(null) // No user data for new user
    setIsEditDialogOpen(true)
  }

  const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <div className="capitalize">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              role === "Admin"
                ? "bg-red-100 text-red-800"
                : role === "Editor"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {role}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="capitalize">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      const handleEdit = () => {
        handleEditUser(user)
      }

      const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log("Delete user:", user.id)
      }

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
          >
            <span className="sr-only">Edit user</span>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <span className="sr-only">Delete user</span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center space-x-2">
          <Button onClick={handleAddUser} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
              className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              {">"}
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              {">>"}
            </Button>
          </div>
        </div>
      </div>

      {/* Edit User Dialog */}
      <EditUserDialog
        user={editingUser}
        isOpen={isEditDialogOpen}
        onClose={handleCloseDialog}
        onUpdate={handleUpdateUser}
      />
    </div>
  )
}
