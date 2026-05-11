import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 3. Bakım Modu Şalteri Kontrolü
  const pathname = request.nextUrl.pathname
  const isMaintenancePage = pathname === '/maintenance'
  const isLoginPage = pathname === '/login' || pathname.startsWith('/auth')
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')

  if (!isMaintenancePage && !isLoginPage && !isPublicAsset) {
    const { data: settings } = await supabase
      .from('system_settings')
      .select('maintenance_mode')
      .eq('id', 1)
      .maybeSingle()

    if (settings?.maintenance_mode) {
      // Admin kontrolü (User objesi 57. satırdan geliyor)
      let isAdmin = false
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle()
        isAdmin = userData?.role === 'admin'
      }

      if (!isAdmin) {
        return NextResponse.redirect(new URL('/maintenance', request.url))
      }
    }
  }

  // RBAC Kontrolü: Kritik yollar sadece Admin'lere açık
  const isKritikYol = pathname.startsWith('/admin') || pathname.startsWith('/settings/admin')

  if (isKritikYol) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role kontrolü
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
