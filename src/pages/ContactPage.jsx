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

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        {/* Get in Touch */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
            Get in touch
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-full mb-3 md:mb-4">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                No 2 tomez avenue off ago palace road, Amuwo odofin
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-full mb-3 md:mb-4">
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                +234 806 873 9137
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 sm:p-6 md:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-full mb-3 md:mb-4">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                neesglobalservice@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg overflow-hidden mb-10 md:mb-16 shadow-sm border border-gray-100">
          <div className="h-64 sm:h-80 md:h-[450px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2749.753254687528!2d3.30853986668356!3d6.478831118201663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b896d847293cb%3A0x77ca73e4d81be4c1!2sNEES%20GLOBAL%20SERVICES%20aka%20YUNQIDA!5e0!3m2!1sen!2sng!4v1779117266959!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Drop us message
            </h2>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 md:p-8">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-emerald-600 text-sm md:text-base transition-colors"
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
