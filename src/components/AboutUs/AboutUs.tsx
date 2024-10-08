import React from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWifi,
  FaCoffee,
  FaPrint,
  FaStar,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import path from '@/constants/path';
import { useNavigate } from 'react-router';

const AboutUs = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: 'Minh Nguyen',
      role: 'Founder & CEO',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Do Tong',
      role: 'COO',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Bao Ho',
      role: 'Head of Operations',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah L.',
      rating: 5,
      text: 'Không gian làm việc tuyệt vời với các tiện ích tuyệt vời!',
    },
    {
      name: 'David M.',
      rating: 5,
      text: 'Môi trường chuyên nghiệp và nhân viên thân thiện.',
    },
    {
      name: 'Emily R.',
      rating: 5,
      text: 'Hoàn hảo cho các freelancer và nhóm nhỏ.',
    },
  ];
  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Về Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nhiệm vụ</h3>
              <p className="text-gray-700 mb-4">
                Tại đây, chúng tôi cố gắng cung cấp các giải pháp không gian làm
                việc sáng tạo và linh hoạt giúp các chuyên gia và doanh nghiệp
                phát triển trong một môi trường cộng tác.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Giá trị mang lại</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Đổi mới và sáng tạo</li>
                <li>ợp tác và cộng đồng</li>
                <li>Linh hoạt và thích ứng</li>
                <li>Bền vững và thân thiện với môi trường</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Đội Ngũ Của Chúng Tôi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                    />
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Workspace Features */}
      {/* <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tính Năng Không Gian Làm Việc
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaWifi />}
              title="High-Speed Internet"
              description="Lightning-fast, reliable internet connection throughout the workspace."
            />
            <FeatureCard
              icon={<FaCoffee />}
              title="Coffee Bar"
              description="Complimentary coffee and tea to keep you energized throughout the day."
            />
            <FeatureCard
              icon={<FaPrint />}
              title="Printing Services"
              description="Access to high-quality printers and scanners for all your document needs."
            />
          </div>
        </div>
      </section> */}

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Workspace Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaWifi className="text-4xl mb-4 text-blue-600" />,
                title: 'High-Speed Internet',
                description:
                  'Lightning-fast, reliable WiFi throughout the workspace.',
              },
              {
                icon: <FaCoffee className="text-4xl mb-4 text-blue-600" />,
                title: 'Coffee Bar',
                description:
                  'Complimentary gourmet coffee and tea to fuel your workday.',
              },
              {
                icon: <FaPrint className="text-4xl mb-4 text-blue-600" />,
                title: 'Printing Services',
                description:
                  'Access to high-quality printers for all your document needs.',
              },
              {
                icon: (
                  <FaMapMarkerAlt className="text-4xl mb-4 text-blue-600" />
                ),
                title: 'Prime Location',
                description:
                  'Centrally located with easy access to public transportation.',
              },
              {
                icon: <FaPhone className="text-4xl mb-4 text-blue-600" />,
                title: 'Meeting Rooms',
                description:
                  'Fully equipped meeting rooms for client presentations and team collaborations.',
              },
              {
                icon: <FaEnvelope className="text-4xl mb-4 text-blue-600" />,
                title: 'Mail Handling',
                description: 'Professional mail and package handling services.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 transform hover:scale-105"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Những gì khách hàng của chúng tôi nói
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Cơ Sở Chính</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.3060219274423!2d-73.98823492346382!3d40.74844097138868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1685158645145!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="WorkSpace Co. Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Sẵn sàng để nâng cao trải nghiệm không gian làm việc của bạn?
          </h2>
          <p className="text-black text-xl mb-8">
            Đặt lịch hẹn hôm nay và khám phá môi trường hoàn hảo cho doanh
            nghiệp của bạn phát triển.
          </p>
          <motion.button
            onClick={() => navigate(path.rooms)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white shadow-lg px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 hover:text-black transition duration-300"
          >
            Đặt ngay
          </motion.button>
        </div>
      </section>
    </div>
  );
};
// interface FeatureCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="text-4xl text-blue-600 mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-700">{description}</p>
//     </div>
//   );
// };

export default AboutUs;