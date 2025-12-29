import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const { t, language } = useLanguage();
  const { login, register, loginWithGoogle, resetPassword } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string}>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = language === 'fr' ? 'Le nom est requis' : 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'fr' ? "L'email est requis" : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : 'Invalid email';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'fr' ? 'Le mot de passe est requis' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'fr' ? 'Minimum 6 caractères' : 'Minimum 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (mode === 'signin') {
        const { error } = await login(formData.email, formData.password);
        if (error) {
          toast({ 
            title: language === 'fr' ? "Erreur de connexion" : "Login Error",
            description: error,
            variant: "destructive" 
          });
          setLoading(false);
          return;
        }
        toast({ 
          title: language === 'fr' ? "Bienvenue !" : "Welcome back!",
          description: language === 'fr' ? "Connexion réussie." : "You have successfully signed in.",
        });
      } else {
        const { error } = await register(formData.name, formData.email, formData.password);
        if (error) {
          toast({ 
            title: language === 'fr' ? "Erreur d'inscription" : "Registration Error",
            description: error,
            variant: "destructive" 
          });
          setLoading(false);
          return;
        }
        toast({ 
          title: language === 'fr' ? "Compte créé !" : "Account created!",
          description: language === 'fr' ? "Bienvenue chez CodeMarket !" : "Welcome to CodeMarket!",
        });
      }
      onClose();
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
    } catch (error) {
      toast({ 
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Une erreur est survenue. Réessayez." : "Something went wrong. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await loginWithGoogle();
      if (error) {
        toast({ 
          title: language === 'fr' ? "Erreur Google" : "Google Error",
          description: error,
          variant: "destructive" 
        });
      }
    } catch (error) {
      toast({ 
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Connexion Google échouée." : "Google login failed.",
        variant: "destructive" 
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      toast({ 
        title: language === 'fr' ? "Email invalide" : "Invalid email",
        description: language === 'fr' ? "Veuillez entrer un email valide." : "Please enter a valid email.",
        variant: "destructive" 
      });
      return;
    }

    setForgotLoading(true);
    try {
      const { error } = await resetPassword(forgotEmail);
      if (error) {
        toast({ 
          title: language === 'fr' ? "Erreur" : "Error",
          description: error,
          variant: "destructive" 
        });
      } else {
        setForgotSuccess(true);
        toast({ 
          title: language === 'fr' ? "Email envoyé !" : "Email sent!",
          description: language === 'fr' ? "Vérifiez votre boîte de réception." : "Check your inbox.",
        });
      }
    } catch (error) {
      toast({ 
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Une erreur est survenue." : "Something went wrong.",
        variant: "destructive" 
      });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleSwitchMode = (newMode: 'signin' | 'signup') => {
    setErrors({});
    setFormData({ name: '', email: '', password: '' });
    setShowForgotPassword(false);
    setForgotSuccess(false);
    onSwitchMode(newMode);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForgotSuccess(false);
    setForgotEmail('');
  };

  // Forgot Password View
  if (showForgotPassword) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="modal-content animate-scale-in" 
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:rotate-90"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-8">
            <button 
              onClick={handleBackToLogin}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
              <Mail size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">
              {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot Password?'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {language === 'fr' 
                ? 'Entrez votre email pour réinitialiser votre mot de passe'
                : 'Enter your email to reset your password'
              }
            </p>
          </div>

          {forgotSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'fr' ? 'Email envoyé !' : 'Email sent!'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'fr' 
                  ? 'Vérifiez votre boîte de réception et suivez les instructions.'
                  : 'Check your inbox and follow the instructions.'
                }
              </p>
              <button onClick={handleBackToLogin} className="auth-btn">
                {language === 'fr' ? 'Retour à la connexion' : 'Back to login'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground">
                  {t('email_label')}
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="form-input pl-12"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={forgotLoading} 
                className="cta-button w-full flex items-center justify-center gap-2 h-12"
              >
                {forgotLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {language === 'fr' ? 'Envoi...' : 'Sending...'}
                  </>
                ) : (
                  language === 'fr' ? 'Envoyer le lien' : 'Send reset link'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-scale-in" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:rotate-90"
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
            {mode === 'signin' ? <Lock size={28} className="text-white" /> : <User size={28} className="text-white" />}
          </div>
          <h2 className="text-2xl font-bold gradient-text">
            {mode === 'signin' ? t('welcome_back') : t('create_account')}
          </h2>
          <p className="text-muted-foreground mt-2">
            {mode === 'signin' 
              ? (language === 'fr' ? 'Connectez-vous à votre compte' : 'Sign in to your account')
              : (language === 'fr' ? 'Créez votre compte CodeMarket' : 'Create your CodeMarket account')
            }
          </p>
        </div>

        {/* Google Sign In Button */}
        <button 
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-xl bg-card hover:bg-muted/50 transition-all mb-6 group"
        >
          {googleLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span className="font-medium">
            {language === 'fr' ? 'Continuer avec Google' : 'Continue with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">
            {language === 'fr' ? 'ou' : 'or'}
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field (signup only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">
                {t('full_name_label')}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`form-input pl-12 ${errors.name ? 'border-destructive focus:border-destructive' : ''}`}
                />
                {formData.name && !errors.name && (
                  <CheckCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                )}
              </div>
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>
          )}
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              {t('email_label')}
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`form-input pl-12 ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
              />
              {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <CheckCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                <AlertCircle size={14} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-muted-foreground">
                {t('password_label')}
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  {language === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`form-input pl-12 pr-12 ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive flex items-center gap-1 animate-fade-in">
                <AlertCircle size={14} /> {errors.password}
              </p>
            )}
            {mode === 'signup' && formData.password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      formData.password.length >= i * 2
                        ? formData.password.length >= 8
                          ? 'bg-green-500'
                          : formData.password.length >= 6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="cta-button w-full flex items-center justify-center gap-2 h-12"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {language === 'fr' ? 'Chargement...' : 'Loading...'}
              </>
            ) : (
              mode === 'signin' ? t('sign_in') : t('sign_up')
            )}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-center text-muted-foreground mt-6">
          {mode === 'signin' ? t('no_account') : t('have_account')}{' '}
          <button 
            onClick={() => handleSwitchMode(mode === 'signin' ? 'signup' : 'signin')} 
            className="text-primary hover:underline font-semibold"
          >
            {mode === 'signin' ? t('sign_up_link') : t('sign_in_link')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
