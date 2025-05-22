
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      heading: ['Montserrat', 'system-ui', 'sans-serif'],
      body: ['Open Sans', 'system-ui', 'sans-serif'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--foreground)',
            h1: {
              fontWeight: '700',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            },
            h2: {
              fontWeight: '600',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            },
            h3: {
              fontWeight: '600',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            },
            h4: {
              fontWeight: '600',
              fontFamily: 'Montserrat, system-ui, sans-serif',
            },
            p: {
              fontFamily: 'Open Sans, system-ui, sans-serif',
            },
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary)',
              },
            },
          },
        },
      },
      colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				esejfy: {
					burgundy: '#8A1538', // Primary brand color - burgundy
					burgundyLight: '#B01C4A', // Lighter burgundy for hover states
					burgundyDark: '#6A1029', // Darker burgundy for active states
					navy: '#1A2642', // Security-focused navy blue
					navyLight: '#2A3A5F', // Lighter navy for hover states
					gray: '#333842', // Refined dark gray
					grayLight: '#4A5060', // Lighter gray for hover states
					lightgray: '#EAEAEC', // Light gray for backgrounds
					offWhite: '#F8F9FA', // Off-white for card backgrounds
					blue: '#3C6E91', // Trust-inspiring blue
					blueLight: '#4D89B8', // Lighter blue for hover states
					steel: '#5D6E81', // Steel blue-gray for accents
					steelLight: '#7A8A9A', // Lighter steel for hover states
					platinum: '#E6E7E9', // Very light gray that works with burgundy
					gold: '#D4AF37', // Gold for premium/certification indicators
					success: '#2E7D32', // Success green
					warning: '#ED6C02', // Warning orange
					error: '#D32F2F', // Error red
					info: '#0288D1', // Info blue
					// Dark theme colors
					dark: {
						primary: '#171928', // Darker primary background
						secondary: '#212333', // Dark secondary background
						accent: '#2D3043', // Dark accent color
						card: '#1E1F2E', // Dark card background
						border: '#2A2C3E', // Dark border color
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slow-glow': {
          '0%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.08)',
          },
          '100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          }
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slow-glow': 'slow-glow 5s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
