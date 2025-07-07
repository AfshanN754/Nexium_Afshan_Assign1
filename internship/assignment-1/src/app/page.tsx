import Footer from '../components/footer'; // Import Footer component for page footer
import QuoteGenerator from "@/components/QuoteGenerator"; // Import main quote generation component

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/80"> {/* Root container with static gradient background */}
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 
                     bg-slate-800/80 backdrop-blur-lg 
                     border-b border-slate-700
                     shadow-lg"> {/* Fixed navigation bar with styling */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Centered container with responsive padding */}
          <div className="flex justify-center items-center h-24"> {/* Centered title with fixed height */}
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Quote Generator
            </h1> {/* Gradient title for visual appeal */}
          </div>
        </div>
      </nav>

      {/* Main Content with padding to account for fixed navbar */}
      <main className="flex-grow pt-24 pb-12 px-4"> {/* Main content area with padding for navbar */}
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-700/50 to-purple-800/30 
                      border border-slate-600/30 rounded-xl p-6"> {/* Styled container with gradient and border */}
          <QuoteGenerator /> {/* Render the quote generator component */}
        </div>
      </main>
            
      {/* Footer */}
      <Footer className="bg-slate-800/80 backdrop-blur-md border-t border-slate-700" /> {/* Render Footer with custom styling */}
    </div>
  );
}