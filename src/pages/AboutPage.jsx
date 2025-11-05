import { Users, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: '10+', label: 'Years' },
    { value: '10M+', label: 'Clients' },
    { value: '50+', label: 'Shops' },
    { value: '17M+', label: 'Sales' }
  ]

  const team = [
    {
      name: 'Johnny walker',
      role: 'Web designer',
      image: '/team-1.png',
      description:
        'Vestibulum porttitor egestas enim, vitae ullamcorper nisi vulputate quis.'
    },
    {
      name: 'Rebecca flex',
      role: 'Support staff',
      image: '/team-3.png',
      description:
        'Vestibulum porttitor egestas enim, vitae ullamcorper nisi vulputate quis.'
    },
    {
      name: 'Jan ringo',
      role: 'Deputy sale',
      image: '/team-2.png',
      description:
        'Vestibulum porttitor egestas enim, vitae ullamcorper nisi vulputate quis.'
    },
    {
      name: 'Ringo kai',
      role: 'Policy member',
      image: '/team-4.png',
      description:
        'Vestibulum porttitor egestas enim, vitae ullamcorper nisi vulputate quis.'
    }
  ]

  // Defined the three images for the slider
  const heroImages = [
    '/about-us-3.png', // Image 1
    '/about-us-3.png', // Image 2
    '/about-us-3.png'  // Image 3
  ]

  return (
    <div className="bg-gray-50">
      {/* 1. Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / About us</p>
        </div>
      </div>

      {/* --- */}

      {/* 2. LEADER/HERO SECTION (Full Width Slider) */}
      {/* The h-[50vh] and overflow-hidden classes are CRUCIAL for the slider */}
      <div className="relative text-center mb-16 h-[50vh] overflow-hidden">
        
        {/* Title positioned over the image. This stays static. */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 z-10">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            About NEES GLOBAL SERVICES
          </h1>
          <p className="text-xl text-gray-200">
            Powering a Sustainably Clean Future
          </p>
        </div>
        
        {/* Carousel Wrapper - Uses the 'carousel-slide' CSS class */}
        <div className="carousel-slide h-full">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`NEES Solar Image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          ))}
        </div>
      </div>

      {/* --- */}

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16 pt-0">
        
        {/* About Us Summary */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            NEES Global Services stands as a beacon of hope in a world facing
            escalating energy demands and the urgent call to combat climate
            change. We are at the forefront of the solar revolution, offering
            cutting-edge solar devices—from high-efficiency panels to smart
            fans and air conditioners—that are investments in a brighter, greener
            tomorrow. We are committed to empowering communities by making clean,
            affordable energy accessible to everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Users className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To power a sustainably clean future by providing high-quality,
              reliable, and affordable solar energy solutions, helping customers
              save on costs and drastically reduce their carbon footprint.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Lightbulb className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To create a world where energy abundance and environmental
              responsibility coexist harmoniously, building a health hazard-free
              society through comprehensive solar ecosystems.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center border-4 border-emerald-500"
            >
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <img
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}