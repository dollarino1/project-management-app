export default function AuthGuardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    // TODO: validate session, redirect to /login if unauthenticated
    return (
        <>
            {children}
        </>
    );
}