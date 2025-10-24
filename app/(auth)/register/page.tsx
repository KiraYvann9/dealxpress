"use client";

import { useState } from "react";
import { Eye, EyeOff, Phone, Lock, User, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        whatsapp: "",
        city: "",
        neighborhood: "",
        password: "",
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!acceptTerms) {
            alert("Veuillez accepter les conditions d'utilisation");
            return;
        }

        setIsLoading(true);

        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Register:", formData);
        setIsLoading(false);
    };

    const handleGoogleRegister = () => {
        console.log("Google register");
    };

    const handleAppleRegister = () => {
        console.log("Apple register");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-indigo-100 p-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Logo/Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div >
                            <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Créer un compte
                        </h1>
                        <p className="text-gray-600">
                            Rejoignez notre marketplace
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Nom */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Nom complet
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Jean Kouassi"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Numéro de téléphone */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                Numéro de téléphone
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="+225 01 02 03 04 05"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Numéro WhatsApp */}
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                                Numéro WhatsApp
                            </Label>
                            <div className="relative">
                                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="tel"
                                    placeholder="+225 01 02 03 04 05"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Ville */}
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                Ville
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Abidjan"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Quartier */}
                        <div className="space-y-2">
                            <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700">
                                Quartier
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="neighborhood"
                                    name="neighborhood"
                                    type="text"
                                    placeholder="Cocody"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                    className="pl-10 h-12 border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Mot de passe
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 pr-12 h-12 border-gray-300"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Minimum 8 caractères</p>
                        </div>

                        {/* Terms and conditions */}
                        <div className="flex items-start gap-3 pt-2">
                            <Checkbox
                                id="terms"
                                checked={acceptTerms}
                                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                className="mt-1"
                            />
                            <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                                J'accepte les{" "}
                                <button type="button" className="text-yellow-600 hover:underline font-medium">
                                    conditions d'utilisation
                                </button>{" "}
                                et la{" "}
                                <button type="button" className="text-yellow-600 hover:underline font-medium">
                                    politique de confidentialité
                                </button>
                            </Label>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            disabled={isLoading || !acceptTerms}
                            className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-base mt-6"
                        >
                            {isLoading ? "Création du compte..." : "S'inscrire"}
                        </Button>
                    </form>

                    {/* Separator */}
                    <div className="flex items-center gap-4 my-6">
                        <Separator className="flex-1" />
                        <span className="text-sm text-gray-500">OU</span>
                        <Separator className="flex-1" />
                    </div>

                    {/* Social registration buttons */}
                    <div className="space-y-3">
                        {/* Google */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleRegister}
                            className="w-full h-12 border-2 hover:bg-gray-50 font-medium"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continuer avec Google
                        </Button>

                        {/* Apple */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAppleRegister}
                            className="w-full h-12 border-2 hover:bg-gray-50 font-medium"
                        >
                            <svg className="w-5 h-5 mr-3 fill-current" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                            </svg>
                            Continuer avec Apple
                        </Button>
                    </div>

                    {/* Login link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ?{" "}
                            <Link href="/app/(auth)/login"
                                className="text-yellow-600 hover:text-yellow-700 font-semibold"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}