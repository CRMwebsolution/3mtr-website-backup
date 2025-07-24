import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

export default function SuggestTrailerSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#003366] dark:bg-[#002347] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83zm5.657 0L19.514 8.485 20.93 9.9l8.485-8.485h-1.415zM32.686 0L26.2 6.485 27.616 7.9l7.9-7.9h-2.83zm-14.019 0L7.372 11.293l1.415 1.415L20.272 1.415 21.686 0h-3.019zm8.372 0l-7.071 7.07 1.415 1.415 7.07-7.07h-1.414zM40.9 0L26.214 14.686 27.63 16.1 42.314 1.414 40.899 0h.001zm-16.485 0L9.129 15.287l1.414 1.414L26.229 1.015 24.815 0h-.001zM34.485 0L16.8 17.685l1.414 1.414L36.1 1.414 34.485 0h.001zm-10.657 0L9.129 14.7l1.414 1.414L25.229.415 23.815 0h-.001zm-8.485 0L8.544 6.8 9.959 8.214 15.7 2.472 14.286 0h-.001zM48.1 0L28.8 19.3l1.414 1.413L50.514 1.414 49.1 0h-1zM0 9.059V6.231L6.114 0h2.828L0 9.06zM0 14.686V11.86L11.743 0h2.828L0 14.686zm0 5.656V17.53L17.4 0h2.828L0 20.343zM0 26.017V23.19L23.057 0h2.828L0 26.017zm0 5.657V28.86L28.714 0h2.828L0 31.674zm0 5.657V34.517L34.37 0h2.83L0 37.33zm0 5.657V40.175L40.029 0h2.828L0 42.988zm0 5.657V45.832L45.686 0h2.828L0 48.645zm0 5.657V51.49L51.343 0h2.828L0 54.301zm0 5.657V57.148L57 0h2.828L0 59.959zm0 5.657V62.805L62.657 0h2.828L0 65.615zm0 5.657V68.463L68.314 0h2.828L0 71.272zm0 5.657V74.12L73.971 0h2.828L0 76.929zm0 5.657V79.778L79.628 0h2.828L0 82.585zm0 5.658V85.435L85.285 0h2.828L0 88.242zm0 5.657V91.093L90.942 0h2.828L0 93.9zm0 5.657V96.75L96.6 0h2.828L0 99.555zm0 5.657v-2.828L102.257 0h2.828L0 105.213zm0 5.657v-2.828L107.914 0h2.828L0 110.87zm0 5.657v-2.827L113.571 0h2.828L0 116.527zm0 5.657v-2.827L119.228 0h2.828L0 122.184zm0 5.657v-2.827L124.885 0h2.828L0 127.841zm0 5.657v-2.827L130.542 0h2.828L0 133.498zm0 5.657v-2.827L136.2 0h2.828L0 139.156zm0 5.657v-2.827L141.856 0h2.828L0 144.813z\'/%3E%3C/svg%3E")',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Looking for a Different Trailer?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            We're always expanding our fleet. Let us know what trailers you'd like us to carry!
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-[#FF6600] hover:bg-[#ff8533] text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <MessageSquarePlus className="w-5 h-5 mr-2" />
            Suggest a Trailer
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 bottom-0 w-24 h-24 transform -translate-x-1/2 translate-y-1/2 bg-[#FF6600] opacity-10 rounded-full" />
      <div className="absolute right-0 top-0 w-32 h-32 transform translate-x-1/2 -translate-y-1/2 bg-[#FF6600] opacity-10 rounded-full" />
    </section>
  );
}