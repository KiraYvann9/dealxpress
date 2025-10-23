"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Settings, Search, Store, Bell, Inbox, Shield,
    ShoppingBag, TrendingUp, Plus, ChevronRight,
    Car, Home, Shirt, Tag, Smartphone, Tv, Heart,
    Gift, Flower2, Pencil, Sofa, Wrench, DoorOpen,
    Music, Briefcase, PawPrint, Dumbbell, Gamepad2,
    Users, MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";

const mainMenuItems = [
    { icon: Store, label: "Tout", href: "/browse" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    // { icon: Inbox, label: "Inbox", href: "/inbox" },
    // { icon: Shield, label: "Marketplace access", href: "/access" },
    // { icon: ShoppingBag, label: "Buying", href: "/buying", hasArrow: true },
    { icon: TrendingUp, label: "Mes annonces", href: "/selling", hasArrow: true },
];

const categories = [
    { icon: '/assets/categories/small/smartphone.png', label: "Smartphones & Tablets" },
    { icon: '/assets/categories/small/ordinateur.png', label: "Ordinateurss & Accessoires" },
    { icon: '/assets/categories/small/audio.png', label: "Audio & Son" },
    { icon: '/assets/categories/small/camera.png', label: "Caméra" },
    { icon: '/assets/categories/small/montre.png', label: "Montre" },
    { icon: '/assets/categories/small/souris.png', label: "Accessoires" },
    { icon: '/assets/categories/small/console.png', label: "Consoles" },
    { icon: '/assets/categories/small/tv.png', label: "TV & Projecteurs" },
    { icon: '/assets/categories/small/smartphone.png', label: "Electroménager" },
    { icon: '/assets/categories/small/auto.png', label: "Mobilité & Auto" },
    { icon: '/assets/categories/small/confort.png', label: "Confort & Beauté" },
    { icon: '/assets/categories/small/bricolage.png', label: "Bricolage & Jardin" },
    { icon: '/assets/categories/small/lit.png', label: "Lit & Meuble" },
    { icon: '/assets/categories/small/vetements.png', label: "Vêtements & Accessoires" },
    { icon: '/assets/categories/small/immobilier.png', label: "Immobilier" },
    /*{ icon: PawPrint, label: "Pet Supplies" },
    { icon: Dumbbell, label: "Sporting Goods" },
    { icon: Gamepad2, label: "Toys & Games" },
    { icon: Users, label: "Buy and sell groups" },*/
];

export const SidebarComponent = () =>{

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <aside className="w-80 h-screen overflow-y-auto bg-white border-r sticky top-0 z-10">
            {/* Header */}
            <div className="p-4 flex items-center gap-2">
                <div>
                    <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
                </div>
                <h1 className="text-2xl font-bold">Dealxpress</h1>

            </div>

            {/* Search */}
            <div className="px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search Marketplace"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-100 border-none"
                    />
                </div>
            </div>

            {/* Main Menu */}
            <nav className="px-2">
                {mainMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isFirst = index === 0;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group",
                                isFirst && "bg-yellow-50 hover:bg-yellow-100"
                            )}
                        >
                            <div className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center",
                                isFirst ? "bg-yellow-500" : "bg-gray-200"
                            )}>
                                <Icon className={cn(
                                    "w-5 h-5",
                                    isFirst ? "text-white" : "text-gray-700"
                                )} />
                            </div>
                            <span className="flex-1 font-medium">{item.label}</span>
                            {item.hasArrow && (
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Create Listing Button */}
            <div className="px-4 py-4">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Vendre un produit
                </Button>
            </div>

            <Separator />

            {/* Location */}
            <div className="px-4 py-4">
                <h2 className="font-semibold text-lg mb-2">Location</h2>
                <Link href="/location" className="flex items-center gap-2 text-yellow-600 hover:underline">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Abidjan, Cote d Ivoire · Within 65 km</span>
                </Link>
            </div>

            <Separator />

            {/* Categories */}
            <div className="px-4 py-4">
                <h2 className="font-semibold text-lg mb-3">Categories</h2>
                <nav className="space-y-1">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.label}
                                href={`/category/${category.label.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 border">
                                    <Image src={Icon} className="w-5 h-5 text-gray-700" objectFit={'contain'} alt={category.label} width={30} height={30}/>
                                </div>
                                <span className="text-sm font-medium">{category.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}