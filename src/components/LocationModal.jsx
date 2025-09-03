import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { MapPin, Globe, Leaf } from "lucide-react";

export const LocationModal = ({
  isOpen,
  onClose,
  onRequestLocation,
  loading,
  error,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-2xl transition-all border border-green-100">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center"
                >
                  {/* Animated Icon */}
                  <motion.div
                    className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className="w-10 h-10 text-white" />
                    <motion.div
                      className="absolute"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Leaf className="w-6 h-6 text-green-200 -ml-8 -mt-8" />
                    </motion.div>
                  </motion.div>

                  <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">
                    Enable Location Access
                  </Dialog.Title>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We need your location to show you the best herbal products
                    available in your region with accurate pricing and delivery
                    options.
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8 text-left">
                    {[
                      {
                        icon: Globe,
                        text: "Region-specific product availability",
                      },
                      { icon: MapPin, text: "Accurate delivery estimates" },
                      { icon: Leaf, text: "Local herbal recommendations" },
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 text-sm text-gray-700"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <benefit.icon className="w-5 h-5 text-green-500" />
                        <span>{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    onClick={onRequestLocation}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Getting Location...</span>
                      </div>
                    ) : (
                      "Allow Location Access"
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 mt-4">
                    Your location data is only used for product recommendations
                    and is never stored.
                  </p>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
