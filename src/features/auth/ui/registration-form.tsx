import { FormProvider, useForm } from 'react-hook-form';
import { FormRegisterSchema, type TFormRegisterValue } from "../lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { toast } from "react-toastify";
import { useAuthStore } from '../store/auth';
import { Lock, User } from 'lucide-react';

export const RegistrationForm = () => {
    const { registration } = useAuthStore();
    const form = useForm<TFormRegisterValue>({
        resolver: zodResolver(FormRegisterSchema),
        defaultValues: {
            email: '',
            pass: '',
            confirmPass: ''
        }
    })

    const onSubmit = async (data: TFormRegisterValue) => {
        try {
            await registration(data.email, data.pass);

            toast.success("Регистрация успешна!");
        } catch(err) {
            console.error(err);
            toast.error("Ошибка регистрации!");
        }
    }

    return (
        <FormProvider {...form}>
            <form
                className='flex flex-col gap-2'
                onSubmit={form.handleSubmit(onSubmit)}>
                    <TextInput
                        {...form.register('email')}
                        type="email"
                        leftSection={<User />}
                        error={form.formState.errors.email?.message}
                        placeholder="Email"
                    />

                    <PasswordInput
                        {...form.register('pass')}
                        type="password"
                        leftSection={<Lock />}
                        error={form.formState.errors.pass?.message}
                        placeholder="Password"
                        />

                    <PasswordInput
                        {...form.register('confirmPass')}
                        type="password"
                        leftSection={<Lock />}
                        error={form.formState.errors.confirmPass?.message}
                        placeholder="Confirm password"
                    />

                    <Button
                        className="mt-4" 
                        loading={form.formState.isSubmitting}  
                        type="submit">Регистрация</Button>
            </form>
        </FormProvider>
    )
}