const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative h-5 w-5">
        <div className="absolute inset-0 rounded-full border-2 border-white opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
      </div>
      <span className="text-sm font-medium tracking-wide animate-pulse">
        Procesando pago...
      </span>
    </div>
  )
}

export default Loader