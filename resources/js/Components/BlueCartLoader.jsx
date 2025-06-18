import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

const BlueCartLoader = () => {
  const fullText = 'BlueCart'
  const [visibleText, setVisibleText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setVisibleText(fullText.slice(0, index + 1))
        setIndex(index + 1)
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex items-center gap-2 animate-pulse">
        <ShoppingCart className="text-osunblue w-8 h-8 animate-bounce" />
        <h1 className="text-3xl font-bold tracking-wide text-osunblue flex items-center">
          {visibleText}
          <span className="ml-1 w-[2px] h-6 bg-osunblue animate-blink" />
        </h1>
      </div>
    </div>
  )
}

export default BlueCartLoader
