
export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2025 <a 
              href="https://chat-tempmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              ChatTempMail
            </a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
