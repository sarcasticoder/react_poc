import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/contexts/AuthContext'
import { Button } from '@/commons/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/commons/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/commons/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/commons/ui/dropdown-menu'
import { ChevronDown, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

// Admin Panel Logo
const AdminLogo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
      <path d="M2 17L12 22L22 17" />
      <path d="M2 12L12 17L22 12" />
    </svg>
  )
}

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 12L20 12" />
    <path d="M4 6L20 6" />
    <path d="M4 18L20 18" />
  </svg>
)

const AdminNavbar02: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setIsMobile(width < 768)
      }
    }

    checkWidth()
    const resizeObserver = new ResizeObserver(checkWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard', active: isActive('/dashboard') },
    {
      label: 'Users',
      submenu: true,
      type: 'simple' as const,
      items: [
        {
          href: '/admin/users',
          label: 'Users',
        },
        {
          href: '/admin/roles',
          label: 'Roles',
        },
      ],
    },
  ]

  return (
    <header
      ref={containerRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6"
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64 p-1">
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-start gap-0">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        {link.submenu ? (
                          <>
                            <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                              {link.label}
                            </div>
                            <ul>
                              {link.items?.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={item.href}
                                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline text-foreground"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link
                            to={link.href || '#'}
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline text-foreground"
                          >
                            {link.label}
                          </Link>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}
          
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">
                <AdminLogo />
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">Option Matrix</span>
            </Link>
            
            {/* Navigation menu */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      {link.submenu ? (
                        <>
                          <NavigationMenuTrigger>
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[200px] gap-1 p-2">
                              {link.items?.map((item, itemIndex) => (
                                <ListItem
                                  key={itemIndex}
                                  title={item.label}
                                  href={item.href}
                                  type={link.type}
                                />
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          to={link.href || '#'}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                            link.active 
                              ? "bg-accent text-accent-foreground" 
                              : "text-foreground/80 hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>

        {/* Right side - Profile Menu */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground mt-1">{getCurrentDate()}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// ListItem component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    href?: string;
    type?: 'description' | 'simple' | 'icon';
    children?: React.ReactNode;
  }
>(({ className, title, children, type, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        to={props.href || '#'}
        className={cn(
          'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer text-foreground',
          type === 'simple' ? 'text-sm font-medium' : 'space-y-1',
          className
        )}
      >
        <div className={cn(
          type === 'simple' ? 'text-sm font-medium leading-none' : 'text-base font-medium leading-none'
        )}>
          {title}
        </div>
        {children && type !== 'simple' && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        )}
      </Link>
    </NavigationMenuLink>
  );
});
ListItem.displayName = 'ListItem';

export default AdminNavbar02
