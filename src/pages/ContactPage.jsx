import { MapPin, Phone, Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / Contact us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Get in Touch */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">
            Get in touch
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                No 2 tomez avenue off ago palace road, Amuwo odofin
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700">+234 806 897 6393</p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700">neesolar@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg overflow-hidden mb-16">
          <div className="h-96 bg-gray-200 relative">
            <img
              src="/placeholder.svg?height=400&width=1200"
              alt="Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Drop us message
            </h2>
          </div>
          <div className="bg-white rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
