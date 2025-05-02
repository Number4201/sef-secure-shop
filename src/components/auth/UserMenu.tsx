
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/avatar';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  
  if (!user) {
    return null;
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Uživatel';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100 h-10 w-10 p-2 rounded-full"
        >
          {avatarUrl ? (
            <Avatar className="h-7 w-7">
              <img 
                src={avatarUrl} 
                alt={displayName}
                className="object-cover"
              />
            </Avatar>
          ) : (
            <User size={20} className="text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Můj účet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/muj-ucet">Profil</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/muj-ucet/objednavky">Moje objednávky</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/muj-ucet/nastaveni">Nastavení</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          Odhlásit se
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
