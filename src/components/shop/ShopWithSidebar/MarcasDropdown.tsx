"use client";

// import { MarcaResponseSidebar } from "@/actions/getSidebarGenderMarcas-subactegoria";
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";



export interface MarcaResponseSidebar {
  id: number;
  nombre: string;
  slug: string;
  // imagen: string | null;
  // count: number
}

interface PropsItems {
  item: MarcaResponseSidebar;
}
const MarcaItem = ({ item }: PropsItems) => {

  const router = useRouter()
  const searchParams = useSearchParams()


  const marcaSlug = searchParams.get("marca") || ""

  const isSelected = marcaSlug === item.slug

  const handleSelect = (value: string) => {
    // setMarcaSlug(value)
    // router.refresh()

    const params = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      params.delete("marca"); // si ya está seleccionado, lo quitamos
    } else {
      params.set("marca", value); // lo seteamos
    }
    router.push(`?${params.toString()}`); // 👈 esto dispara el loading.tsx
  }

  return (
    <button
      className={`${isSelected && "text-blue-500"
        } group flex items-center justify-between transition duration-200 hover:text-blue-500 `}
      onClick={() => { handleSelect(item.slug) }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${isSelected ? "border-blue-500 bg-blue-500" : "bg-white border-gray-300"
            }`}
        >
          <svg
            className={isSelected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className={`text-black font-sans text-md`}>{item.nombre}</span>
      </div>
    </button>
  );
};

interface Props {
  marcas: MarcaResponseSidebar[]

}
const MarcasDropdown = ({ marcas = [] }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  const params = useParams()
  const subcategoria = params.category || ""


  return (
    <div className="bg-white shadow-md border border-gray-100  rounded-sm">
      <div
        onClick={(e) => {
          e.preventDefault();
          setToggleDropdown(!toggleDropdown);
        }}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5 ${toggleDropdown && "shadow-sm"
          }`}
      >
        <p className="text-gray-900">Marcas</p>
        <button
          aria-label="button for category dropdown"
          className={`text-gray-900 transition duration-200 ${toggleDropdown && "rotate-180"
            }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* dropdown && 'shadow-filter */}
      {/* <!-- dropdown menu --> */}
      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5 ${toggleDropdown ? "flex" : "hidden"
          }`}
      >
        {marcas.length === 0 && (
          <p className="text-gray-500 text-sm">No hay marcas disponibles para {subcategoria}</p>
        )}
        {marcas.map((marca, key) => (
          <MarcaItem key={key} item={marca} />
        ))}
      </div>
    </div>
  );
};

export default MarcasDropdown;