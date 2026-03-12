import { ShoppingCart } from "lucide-react";

const DeliveryEstimateBox = () => {
  return (
    <div className="flex items-start gap-3 border border-black rounded-md p-3 bg-gray-100">
      {/* Icono */}
      {/* <ShoppingCart size={20} className="mt-1 text-gray-900" /> */}
      🚚

      {/* Texto */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm">Envío gratis</p>
          <p className="font-semibold text-sm">GRATIS</p>
        </div>
        <p className="text-sm text-gray-500">
          Hasta 8 días hábiles
        </p>
      </div>
    </div>
  );
};

export default DeliveryEstimateBox;