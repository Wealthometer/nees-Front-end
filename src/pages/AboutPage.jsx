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

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">Home / About us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* About Us Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About us</h1>
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src="/about-us-3.png"
              alt="About NEESSOLAR"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Users className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <Lightbulb className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry's standard dummy text ever since the 1500s.
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
