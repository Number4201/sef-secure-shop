
import React, { useState, useEffect } from 'react';
import CookieConsentBanner from 'react-cookie-consent';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CookieConsent: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Load saved preferences on first render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiesAccepted(true);
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('CookieConsent', 'true');
    setCookiesAccepted(true);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    localStorage.setItem('CookieConsent', 'true');
    setPreferences(allAccepted);
    setCookiesAccepted(true);
  };

  const declineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    localStorage.setItem('CookieConsent', 'false');
    setPreferences(onlyNecessary);
    setCookiesAccepted(false);
  };

  return (
    <>
      {cookiesAccepted === null && (
        <CookieConsentBanner
          location="bottom"
          buttonText="Přijmout vše"
          declineButtonText="Pouze nezbytné"
          cookieName="CookieConsent"
          style={{
            background: "#1A1F2C",
            color: "white",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "1rem",
          }}
          buttonStyle={{
            background: "#8A1538",
            color: "white",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
          }}
          declineButtonStyle={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
          }}
          expires={365}
          enableDeclineButton
          onAccept={acceptAll}
          onDecline={declineAll}
        >
          <h3 className="text-lg font-medium mb-2">Používáme cookies</h3>
          <p className="mb-4">
            Tato webová stránka používá cookies, aby zajistila nejlepší zkušenost při jejím používání.
            Přečtěte si naše <a href="/zasady-cookies" className="text-blue-400 hover:underline">zásady cookies</a> a{" "}
            <a href="/zasady-ochrany-osobnich-udaju" className="text-blue-400 hover:underline">zásady ochrany osobních údajů</a>.
          </p>
          <button
            onClick={() => {
              setShowSettings(true);
            }}
            className="text-blue-400 underline mr-2 cursor-pointer"
          >
            Upravit nastavení
          </button>
        </CookieConsentBanner>
      )}

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nastavení cookies</DialogTitle>
            <DialogDescription>
              Vyberte, které cookies chcete povolit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="necessary" 
                checked={true} 
                disabled={true}
              />
              <div className="grid gap-1">
                <Label htmlFor="necessary" className="font-medium">
                  Nezbytné cookies
                </Label>
                <p className="text-sm text-gray-500">
                  Tyto cookies jsou nezbytné pro fungování webových stránek a nemohou být vypnuty.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="analytics" 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, analytics: checked === true})
                }
              />
              <div className="grid gap-1">
                <Label htmlFor="analytics" className="font-medium">
                  Analytické cookies
                </Label>
                <p className="text-sm text-gray-500">
                  Tyto cookies nám umožňují počítat návštěvy a zdroje provozu, abychom mohli měřit a zlepšovat výkon našich stránek.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="marketing" 
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, marketing: checked === true})
                }
              />
              <div className="grid gap-1">
                <Label htmlFor="marketing" className="font-medium">
                  Marketingové cookies
                </Label>
                <p className="text-sm text-gray-500">
                  Tyto cookies nám umožňují zobrazovat vám relevantní obsah a reklamy na základě vašich zájmů.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="preferences" 
                checked={preferences.preferences}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, preferences: checked === true})
                }
              />
              <div className="grid gap-1">
                <Label htmlFor="preferences" className="font-medium">
                  Preferenční cookies
                </Label>
                <p className="text-sm text-gray-500">
                  Tyto cookies umožňují stránce zapamatovat si vaše volby a poskytnout vylepšené funkce.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={declineAll}>
              Pouze nezbytné
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={acceptAll}>
                Přijmout vše
              </Button>
              <Button onClick={savePreferences}>
                Uložit nastavení
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
