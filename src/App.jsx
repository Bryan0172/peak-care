import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Ebooks from './pages/Ebooks'
import Success from './pages/Success'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/erfolg" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
