import Header from "../components/header";
import Footer from "../components/footer";
import "../globals.css";
export default function AppLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="antialiased">
<Header />
{children}
<Footer />
</body>
</html>
);
}