import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Mail, ArrowRight } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email('Email invalide'),
});

const resetCodeSchema = z.object({
  code: z.string().length(5, 'Le code doit contenir 5 chiffres'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type EmailForm = z.infer<typeof emailSchema>;
type ResetForm = z.infer<typeof resetCodeSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [resetEmail, setResetEmail] = useState('');
  
  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const resetForm = useForm<ResetForm>({
    resolver: zodResolver(resetCodeSchema),
  });

  const handleEmailSubmit = async (data: EmailForm) => {
    try {
      // Simuler l'envoi d'email avec code
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      console.log('Code de réinitialisation:', code);
      
      setResetEmail(data.email);
      setStep('code');
      toast.success('Un code de réinitialisation a été envoyé à votre email');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleResetSubmit = async (data: ResetForm) => {
    try {
      // Simuler la réinitialisation du mot de passe
      console.log('Nouveau mot de passe pour', resetEmail);
      toast.success('Votre mot de passe a été réinitialisé');
      window.location.href = '/login';
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <main className="pt-24">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mot de passe oublié</h1>
        
        {step === 'email' ? (
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...emailForm.register('email')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Votre email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition flex items-center justify-center"
            >
              Envoyer le code
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        ) : (
          <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code de réinitialisation
              </label>
              <input
                type="text"
                {...resetForm.register('code')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                placeholder="12345"
              />
              {resetForm.formState.errors.code && (
                <p className="text-red-500 text-sm mt-1">{resetForm.formState.errors.code.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                {...resetForm.register('password')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              {resetForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{resetForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                {...resetForm.register('confirmPassword')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              {resetForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{resetForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Réinitialiser le mot de passe
            </button>
          </form>
        )}
      </div>
    </main>
  );
}