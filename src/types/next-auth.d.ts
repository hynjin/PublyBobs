import NextAuth, { User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: User;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    userId: number;
    email: string;
    name: string;
    workspaceMember?: WorkspaceMemberType;
    access_token: string;
  }
  /** The OAuth profile returned from your provider */
  interface Profile {
    user?: {
      name?: any;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
