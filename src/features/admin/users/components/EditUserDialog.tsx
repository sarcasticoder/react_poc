import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/commons/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/commons/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/commons/ui/form"
import { Input } from "@/commons/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/commons/ui/select"

// User type definition
export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Inactive"
  createdAt: string
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.enum(["Admin", "Editor", "Viewer"], {
    required_error: "Please select a role.",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a status.",
  }),
})

interface EditUserDialogProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (userData: Partial<User>) => void
}

export default function EditUserDialog({
  user,
  isOpen,
  onClose,
  onUpdate,
}: EditUserDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    },
  })

  // Update form values when user changes
  React.useEffect(() => {
    if (user) {
      // Edit mode - populate with user data
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else {
      // Add mode - reset to empty values with defaults
      form.reset({
        name: "",
        email: "",
        role: "Viewer",
        status: "Active",
      })
    }
  }, [user, form, isOpen])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (user) {
      // Edit mode - update existing user
      onUpdate({
        id: user.id,
        ...values,
        createdAt: user.createdAt, // Keep original creation date
      })
    } else {
      // Add mode - create new user
      onUpdate({
        id: Date.now().toString(), // Generate temporary ID
        ...values,
        createdAt: new Date().toISOString().split('T')[0], // Current date
      })
    }
    onClose()
  }

  const handleClose = () => {
    // Reset form to empty values
    form.reset({
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" key={user?.id || 'add-user'}>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {user 
              ? 'Make changes to the user information here. Click update when you\'re done.'
              : 'Fill in the user information below. Click add when you\'re done.'
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">{user ? 'Update' : 'Add User'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
