import NavBar from '@/Components/NavBar'

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <main className="p-4">{children}</main>
        </div>
    )
}
