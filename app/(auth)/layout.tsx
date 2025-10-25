import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";

export default function AuthLayout(
    {
        children,
    }: { children: React.ReactNode, login: React.ReactNode, register: React.ReactNode }) {
    return (
        <div className="w-full">
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                    <Button variant={'outline'} asChild>
                        <Link href={'/'}>
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Retourner à l'accueil
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-indigo-100 p-4">
                { children }
            </div>
        </div>
    )
}