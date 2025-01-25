import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { Menu, X, ChevronDown } from 'lucide-react';
    import { Button } from '@/components/ui/Button';
    import { CartIcon } from '@/components/cart/CartIcon';
    import { CartPopover } from '@/components/cart/CartPopover';
    import { motion, AnimatePresence } from 'framer-motion';

    export const Navbar: React.FC = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isCartOpen, setIsCartOpen] = useState(false);
      const [isOfferingsOpen, setIsOfferingsOpen] = useState(false);

      const closeMenu = () => setIsMenuOpen(false);
      const toggleCart = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        console.log('toggleCart called, isCartOpen:', !isCartOpen);
        setIsCartOpen(!isCartOpen);
      };

      const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
        <Link
          to={to}
          className="text-[#777A55] hover:text-[#777A55]/80 px-2 py-1"
          onClick={closeMenu}
        >
          {children}
        </Link>
      );

      return (
        <nav className="bg-[#EBEBDA] shadow-md relative z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#777A55] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <Link to="/" className="text-2xl font-bold text-[#777A55]" onClick={closeMenu}>
                  Nghilichi
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>

                {/* Offerings Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setIsOfferingsOpen(true)}
                  onMouseLeave={() => setIsOfferingsOpen(false)}
                >
                  <button className="text-[#777A55] hover:text-[#777A55]/80 px-2 py-1 flex items-center">
                    Offerings <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  {isOfferingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-10"
                    >
                      <div className="flex flex-col p-2 space-y-1">
                        <Link
                          to="/goddess-chi-pads"
                          className="text-[#777A55] hover:text-[#777A55]/80 px-2 py-1"
                          onClick={() => setIsOfferingsOpen(false)}
                        >
                          Goddess Chi Luxury Pads
                        </Link>
                        <Link
                          to="/retreats"
                          className="text-[#777A55] hover:text-[#777A55]/80 px-2 py-1"
                          onClick={() => setIsOfferingsOpen(false)}
                        >
                          Retreats
                        </Link>
                        <Link
                          to="/private-clients"
                          className="text-[#777A55] hover:text-[#777A55]/80 px-2 py-1"
                          onClick={() => setIsOfferingsOpen(false)}
                        >
                          Private Clients
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>

                <NavLink to="/about-me">About Me</NavLink>
                <NavLink to="/consultation">Book Consultation</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="relative"
                    onClick={toggleCart}
                    onTouchStart={toggleCart}
                  >
                    <CartIcon />
                  </Button>
                  <CartPopover isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="relative"
                  onClick={toggleCart}
                  onTouchStart={toggleCart}
                >
                  <CartIcon />
                </Button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#777A55] p-2 rounded-md"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden absolute w-full bg-[#EBEBDA] shadow-lg"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center px-4 py-4 space-y-4"
                >
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/shop">Shop</NavLink>
                  <NavLink to="/goddess-chi-pads">Goddess Chi Luxury Pads</NavLink>
                  <NavLink to="/retreats">Retreats</NavLink>
                  <NavLink to="/private-clients">Private Clients</NavLink>
                  <NavLink to="/about-me">About Me</NavLink>
                  <NavLink to="/consultation">Book Consultation</NavLink>
                  <NavLink to="/blog">Blog</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      );
    };
