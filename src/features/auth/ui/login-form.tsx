import { FormProvider, useForm } from 'react-hook-form';
import { FormLoginSchema, type TFormLoginValue } from "../lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/auth';
import { User, Lock } from "lucide-react";

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const form = useForm<TFormLoginValue>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues: {
            email: '',
            pass: ''
        }
    })

    const onSubmit = async (data: TFormLoginValue) => {
        try {
            await login(data.email, data.pass);
            navigate('/');
        } catch(err) {
            console.error(err);
            toast.error("Ошибка авторизации! Проверьте данные для входа.");
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
                        error={form.formState.errors.email?.message}
                        leftSection={<User />}
                        placeholder="Example"
                    />

                    <PasswordInput
                        {...form.register('pass')}
                        type="password"
                        leftSection={<Lock />}
                        error={form.formState.errors.pass?.message}
                        placeholder="Password"
                    />

                    <Button
                        className="mt-4" 
                        loading={form.formState.isSubmitting}  
                        type="submit">
                            Войти
                    </Button>
            </form>
        </FormProvider>
    )
}