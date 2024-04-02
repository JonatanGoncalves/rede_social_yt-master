function AuthPage({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[url('https://wesco.com.br/wp-content/uploads/2015/08/Pessoas-felizes.jpg')] bg-no-repeat bg-cover h-screen flex min-h-screen flex-col items-center justify-center">
            <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11 text-gray-600 w-1/4">
                {children}
            </form>
        </main>
    );
}

export default AuthPage;