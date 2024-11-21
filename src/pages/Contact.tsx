import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 mb-8">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter !
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-600 mr-3" />
                <span>dgallula@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-600 mr-3" />
                <span>+972 538478654</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-600 mr-3" />
                <span>Jérusalem, Israël</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}