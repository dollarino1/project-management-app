export default function AuthGuardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex flex-col justify-center items-center">
            Auth page
            { children }
        </div>
    );
}