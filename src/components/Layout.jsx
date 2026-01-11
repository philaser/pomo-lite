export function Layout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 p-4">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    )
}
