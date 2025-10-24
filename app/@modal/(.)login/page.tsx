'use client'

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {useRouter} from "next/navigation";
import Image from "next/image";
import {Apple, Eye, EyeOff, Lock, Phone} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useState} from "react";

const formSchema = z.object({
    phone_number: z.string(),
    password: z.string()
})

export default function LoginModal () {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone_number: "",
            password: ""
        }
    })

    const handleLogin = ()=>{}
    return (
        <Dialog defaultOpen onOpenChange={()=>router.back()}>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                </DialogHeader>

                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-2xl ">
                        {/* Logo/Header */}
                        <div className="text-center mb-8 flex flex-col items-center gap-2">
                            <div>
                                <Image src="/assets/logo.png" alt="Logo" width={60} height={60} />
                            </div>
                            <p className="text-gray-600">
                                Connectez-vous à votre compte
                            </p>
                        </div>

                        {/* Form */}
                        <Form {...form}>

                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Numéro de téléphone */}
                                <FormField
                                    name={'phone_number'}
                                    render={({field})=>(
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                Numéro de téléphone
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+225 01 02 03 04 05"
                                                        className="pl-10 h-12 border-gray-300"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={'password'}
                                    render={({field})=>(
                                        <FormItem className="space-y-2">
                                            <FormLabel htmlFor="password" className="text-sm font-medium text-gray-700">
                                                Mot de passe
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="pl-10 pr-12 h-12 border-gray-300"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5"/>
                                                        ) : (
                                                            <Eye className="w-5 h-5"/>
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />


                                {/* Forgot password */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                                    >
                                        Mot de passe oublié ?
                                    </button>
                                </div>

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-base"
                                >
                                    {isLoading ? "Connexion..." : "Se connecter"}
                                </Button>
                            </form>
                        </Form>

                        {/* Separator */}
                        <div className="flex items-center gap-4 my-6">
                            <Separator className="flex-1"/>
                            <span className="text-sm text-gray-500">OU</span>
                            <Separator className="flex-1"/>
                        </div>

                        {/* Social login buttons */}
                        <div className="space-y-3">
                            {/* Google */}
                            <Button
                                type="button"
                                variant="outline"
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
                                className="w-full h-12 border-2 hover:bg-gray-50 font-medium"
                            >
                                <Apple className="w-5 h-5 mr-3 fill-current"/>
                                Continuer avec Apple
                            </Button>
                        </div>

                        {/* Sign up link */}
                        {/*<div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Vous n'avez pas de compte ?{" "}
                                <Link href="/register"
                                      className="text-yellow-600 hover:text-yellow-700 font-semibold"
                                >
                                    S'inscrire
                                </Link>
                            </p>
                        </div>*/}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        En vous connectant, vous acceptez nos{" "}
                        <button className="text-yellow-600 hover:underline">
                            Conditions d'utilisation
                        </button>
                        {" "}
                        et notre{" "}
                        <button className="text-yellow-600 hover:underline">
                            Politique de confidentialité
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
