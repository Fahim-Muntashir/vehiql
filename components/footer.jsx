import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">Vehiql AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Find your dream car with advanced AI-powered search and seamless
              test drive booking from thousands of verified vehicles.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:text-blue-500"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:text-blue-500"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:text-blue-500"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:text-blue-500"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 hover:text-blue-500"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Browse Cars
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  AI Image Search
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Test Drive Booking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Featured Cars
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Saved Cars
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Browse by Type</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  SUV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Sedan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Hatchback
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Convertible
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  Coupe
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <h4 className="text-md font-medium text-white mb-3">
                Popular Brands
              </h4>
              <div className="flex flex-wrap gap-2">
                {["BMW", "Honda", "Hyundai", "Ford", "Nissan", "Tata"].map(
                  (brand) => (
                    <Button
                      key={brand}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-blue-500 hover:border-blue-500 bg-transparent"
                    >
                      {brand}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get the latest car deals and updates.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="pt-4 space-y-3">
              <h4 className="text-md font-medium text-white">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>support@vehiql.ai</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>123 Auto Street, Car City, CC 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 Vehiql AI. All rights reserved. Powered by advanced AI
            technology.
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
