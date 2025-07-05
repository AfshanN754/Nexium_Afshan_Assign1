import QuoteGenerator from "@/components/QuoteGenerator"
//import Footer from '../components/footer';
 // Adjust the path based on your file structure
 import Footer from "@/components/footer";
 //import Footer from "../components/footer.tsx"; // Add .tsx extension
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 to-pink-300 py-12">
      <QuoteGenerator />
       <Footer /> {/* Added Footer component here */}
    </main>
  )
   //<Footer /> {/* Added Footer component here */}
}