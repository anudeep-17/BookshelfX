import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest)
{
    const user = request.cookies.get('user');

    const customerRoutes = [
        '/',
        '/Reader/*',
        '/api/books/*',
        '/api/chatGPT',
        '/api/user/reviewBook/*',
        '/api/user/addUser',
        '/api/user/getUser',
        '/api/user/favouriteBook/*',
        '/api/user/authenticate',
        '/api/user/getRentalsofUser',
        '/api/user/updatePassword',
        '/api/SendEmail',
      ];
      
      const LibrarianRoutes = [
        '/',
        '/librarian/*',
        '/api/*',
      ];

    if (user && user.value)
    {
        try {
          const role = JSON.parse(user.value).role;
          const currentPath = request.nextUrl.pathname;          

          if (role === 'customer') {
            if (isPathInRoutes(currentPath, customerRoutes)) {
              return NextResponse.next();
            }
            else if (isPathInRoutes(currentPath, LibrarianRoutes)) 
            {
              return NextResponse.redirect('http://localhost:3000/notAuthorized');
            }
          } 
          else if (role === 'librarian' && isPathInRoutes(currentPath, LibrarianRoutes)) 
          {
            return NextResponse.next();
          }
        } catch (error) {
          return NextResponse.error(); 
        }
    }
}
 
function isPathInRoutes(path: string, routes: string[]): boolean {
    return routes.some(route => {
      if (route.endsWith('/*')) {
        return path.startsWith(route.slice(0, -2));
      } else {
        return path === route;
      }
    });
  }