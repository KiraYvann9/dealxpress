"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Plus, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Schéma de validation Zod
const productSchema = z.object({
    photos: z
        .array(z.instanceof(File))
        .min(1, "Au moins une photo est requise")
        .max(6, "Maximum 6 photos autorisées"),
    name: z
        .string()
        .min(3, "Le nom doit contenir au moins 3 caractères")
        .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    category: z.string().min(1, "La catégorie est requise"),
    description: z
        .string()
        .min(20, "La description doit contenir au moins 20 caractères")
        .max(1000, "La description ne peut pas dépasser 1000 caractères"),
    price: z
        .string()
        .min(1, "Le prix est requis")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Le prix doit être un nombre positif",
        }),
    condition: z.enum(["new", "used", "refurbished"]).describe("L'état du produit est requis"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const categories = [
    "Véhicules",
    "Immobilier",
    "Vêtements",
    "Électronique",
    "Divertissement",
    "Famille",
    "Jardin & Extérieur",
    "Loisirs",
    "Maison",
    "Instruments de musique",
    "Fournitures de bureau",
    "Animaux",
    "Articles de sport",
    "Jouets & Jeux",
];

export const SellingComponent = ()=> {
    const [open, setOpen] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            photos: [],
            name: "",
            category: "",
            description: "",
            price: "",
            condition: undefined,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const currentPhotos = form.getValues("photos") || [];

        if (currentPhotos.length + files.length > 6) {
            form.setError("photos", {
                message: "Vous ne pouvez ajouter que 6 photos maximum",
            });
            return;
        }

        const newPhotos = [...currentPhotos, ...files];
        form.setValue("photos", newPhotos, { shouldValidate: true });

        // Créer les aperçus
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const currentPhotos = form.getValues("photos");
        const newPhotos = currentPhotos.filter((_, i) => i !== index);
        form.setValue("photos", newPhotos, { shouldValidate: true });

        // Supprimer l'aperçu
        URL.revokeObjectURL(previewImages[index]);
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data: ProductFormValues) => {
        console.log("Form data:", data);

        // Créer un FormData pour l'upload des fichiers
        const formData = new FormData();
        data.photos.forEach((photo, index) => {
            formData.append(`photo${index}`, photo);
        });
        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("condition", data.condition);

        // Simuler un appel API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Réinitialiser le formulaire
        form.reset();
        setPreviewImages([]);
        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction={'left'}>
            <DrawerTrigger asChild>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Vendre un produit
                </Button>
            </DrawerTrigger>

            <DrawerContent className="max-h-screen">
                <div className="mx-auto w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                    <DrawerHeader>
                        <DrawerTitle>Ajouter un nouveau produit</DrawerTitle>
                        <DrawerDescription>
                            Remplissez les informations pour publier votre article
                        </DrawerDescription>
                    </DrawerHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-6">
                            {/* Photos */}
                            <FormField
                                control={form.control}
                                name="photos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Photos (Maximum 6)</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {/* Grid des photos */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    {previewImages.map((preview, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group"
                                                        >
                                                            <Image
                                                                src={preview}
                                                                alt={`Preview ${index + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}

                                                    {/* Bouton d'ajout */}
                                                    {previewImages.length < 6 && (
                                                        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
                                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                            <span className="text-sm text-gray-500">Ajouter</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={handleImageChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Ajoutez jusqu'à 6 photos de votre article
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Nom de l'article */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom de l'article</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: iPhone 13 Pro Max 256GB"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Catégorie */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catégorie</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Décrivez votre article en détail..."
                                                className="min-h-32 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {field.value.length}/1000 caractères
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* État */}
                            <FormField
                                control={form.control}
                                name="condition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>État du produit</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex flex-col space-y-2"
                                            >
                                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                                                    <RadioGroupItem value="new" id="new" />
                                                    <label htmlFor="new" className="flex-1 cursor-pointer">
                                                        <div className="font-medium">Neuf</div>
                                                        <div className="text-sm text-gray-500">
                                                            Article jamais utilisé
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                                                    <RadioGroupItem value="used" id="used" />
                                                    <label htmlFor="used" className="flex-1 cursor-pointer">
                                                        <div className="font-medium">Seconde main</div>
                                                        <div className="text-sm text-gray-500">
                                                            Article déjà utilisé
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                                                    <RadioGroupItem value="refurbished" id="refurbished" />
                                                    <label
                                                        htmlFor="refurbished"
                                                        className="flex-1 cursor-pointer"
                                                    >
                                                        <div className="font-medium">Reconditionné</div>
                                                        <div className="text-sm text-gray-500">
                                                            Article remis à neuf
                                                        </div>
                                                    </label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Prix */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prix</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="50000"
                                                    {...field}
                                                    className="pr-16"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          CFA
                        </span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DrawerFooter className="px-0 pt-6">
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                                >
                                    {form.formState.isSubmitting
                                        ? "Publication..."
                                        : "Publier l'article"}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full">
                                        Annuler
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}