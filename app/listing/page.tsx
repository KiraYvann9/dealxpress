"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {SidebarComponent} from "@/components/sidebar/SidebarComponent";

// Type pour un produit
interface Product {
    id: string;
    title: string;
    price: string;
    location: string;
    image: string;
}

// Données mockées (à remplacer par tes vraies données)
const generateMockProducts = (page: number): Product[] => {
    const products: Product[] = [];
    const baseId = page * 20;

    const mockItems = [
        { title: "iPhone 16 Pro Max", price: "470 000 CFA" },
        { title: "Nintendo Switch avec accessoires", price: "100 000 CFA" },
        { title: "Table gaming en L", price: "75 000 CFA" },
        { title: "Canon M50 mark II", price: "250 000 CFA" },
        { title: "MacBook Pro", price: "130 000 CFA" },
        { title: "iPhone X américain 64 GB", price: "35 000 CFA" },
        { title: "Manette ps5 couleur grise", price: "37 000 CFA" },
        { title: "Casque de jeu", price: "10 000 CFA" },
        { title: "Trotinette (Bluetooth)", price: "207 000 CFA" },
        { title: "Apple Watch série 4", price: "40 000 CFA" },
        { title: "Robot intelligent", price: "15 000 CFA" },
        { title: "Complet homme", price: "11 000 CFA" },
        { title: "Lit capitaine", price: "75 000 CFA" },
        { title: "Ps4 standard avec 2 jeux", price: "90 000 CFA" },
        { title: "Casque audio", price: "72 000 CFA" },
        { title: "iPad 10e génération", price: "225 000 CFA" },
        { title: "Samsung Galaxy S22 Ultra 5G", price: "90 000 CFA" },
    ];

    for (let i = 0; i < 20; i++) {
        const item = mockItems[i % mockItems.length];
        products.push({
            id: `${baseId + i}`,
            title: item.title,
            price: item.price,
            location: "Abidjan, Cote d'Ivoire",
            image: `https://picsum.photos/seed/${baseId + i}/400/300`,
        });
    }

    return products;
};

export default function ListingPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Charger les produits initiaux
    useEffect(() => {
        loadMoreProducts();
    }, []);

    // Infinite scroll avec Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading]);

    const loadMoreProducts = async () => {
        if (loading) return;

        setLoading(true);

        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newProducts = generateMockProducts(page);
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);

        // Arrêter après 5 pages (100 produits) pour la démo
        if (page >= 4) {
            setHasMore(false);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Header */}
                <SidebarComponent />

            <div className="w-full ">
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Today's picks</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600">Abidjan · 65 km</span>
                        </div>
                    </div>
                </div>


                {/* Grid de produits */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                            >
                                {/* Image */}
                                <div className="relative aspect-square bg-gray-100">
                                    <Image
                                        objectFit={"cover"}
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <p className="font-bold text-lg mb-1">{product.price}</p>
                                    <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
                                        {product.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">{product.location}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Loading indicator */}
                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    )}

                    {/* Observer target pour infinite scroll */}
                    <div ref={observerTarget} className="h-10" />

                    {/* Message de fin */}
                    {!hasMore && (
                        <div className="text-center py-8 text-gray-500">
                            <p>Vous avez atteint la fin des résultats</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}