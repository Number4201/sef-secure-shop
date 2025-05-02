
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTrigger,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '@/services/auth';
import { toast } from '@/hooks/use-toast';

interface LoginDialogProps {
  trigger?: React.ReactNode;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ trigger }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Chyba",
        description: "Zadejte e-mail a heslo",
        variant: "destructive"
      });
      return;
    }

    try {
      // For demo purposes, handle login/register success
      const { error } = isRegister 
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);
        
      if (error) throw error;
      
      // Success - This would be replaced with actual backend response handling
      setIsOpen(false);
      
      // Simulate login for demo purposes
      const mockUser = {
        id: '1',
        email,
        user_metadata: {
          full_name: email.split('@')[0],
          avatar_url: ''
        }
      };
      
      localStorage.setItem('demo_auth_user', JSON.stringify(mockUser));
      window.location.reload(); // Reload to pickup the auth changes
      
      toast({
        title: isRegister ? "Registrace úspěšná" : "Přihlášení úspěšné",
        description: isRegister 
          ? "Váš účet byl vytvořen." 
          : "Vítejte zpět!",
      });
    } catch (error: any) {
      console.error('Login/register error:', error);
      toast({
        title: "Chyba",
        description: error.message || "Nastala chyba při přihlašování",
        variant: "destructive"
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Store the current location to return after auth
      localStorage.setItem('authReturnTo', window.location.pathname);
      
      await signInWithGoogle();
      setIsOpen(false);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Chyba",
        description: error.message || "Nepodařilo se přihlásit pomocí Google",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Přihlásit se</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Registrace' : 'Přihlášení'}</DialogTitle>
          <DialogDescription>
            {isRegister 
              ? 'Vytvořte si nový účet pro přístup k vašim objednávkám a dalším funkcím.' 
              : 'Přihlaste se ke svému účtu pro přístup k vašim objednávkám a dalším funkcím.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.cz"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isRegister ? 'Registrovat' : 'Přihlásit'}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">nebo</span>
          </div>
        </div>

        <Button 
          type="button"
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleSignIn}
        >
          <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Pokračovat s Google
        </Button>

        <div className="mt-4 text-center text-sm">
          {isRegister ? (
            <p>
              Již máte účet?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => setIsRegister(false)}
              >
                Přihlásit se
              </Button>
            </p>
          ) : (
            <p>
              Nemáte účet?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => setIsRegister(true)}
              >
                Zaregistrovat se
              </Button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
