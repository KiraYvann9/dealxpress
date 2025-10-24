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

const formSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    username: z.string().min(1, {message: "Username is required"}),
})
export const LoginButtonComponent = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
        },
    })
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">Se connecter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connexion</DialogTitle>
                    <DialogDescription>
                        Connectez vous, vendez rapidement et facilement.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="phone">N° Téléphone</Label>
                                <Input type={'tel'} id="phone" name="phone" placeholder="+1234567890"/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input type={'password'} id="password" name="password" placeholder={'******'}/>
                            </div>
                        </div>
                    </form>
                </Form>
                <DialogFooter className="flex flex-colgap-2">
                    <Button type="submit" className={'bg-yellow-400 hover:bg-amber-500 text-black flex w-full'}>Se connecter</Button>
                    {/*<DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>*/}
                </DialogFooter>

                <span>Vous n'avez pas de compte ? </span>
            </DialogContent>
        </Dialog>
    )
}
